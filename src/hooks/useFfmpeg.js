import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { UseCtx } from "../contexts/Context";

/**
 * This hook exposes methods that can be used to apply
 * various transformations to a media source using ffmpeg
 * @returns
 */
export function useFfmpeg() {
  const ffmpeg = createFFmpeg({
    log: true,
  });

  const { setOutputVideo } = UseCtx();

  /**
   * Applies a full height template
   * @param {*} videoEle
   * @param {*} currentVideo
   * @param {*} overlay
   * @param {*} botCrop
   * @param {*} botPos
   * @param {*} clipStart
   * @param {*} clipEnd
   */
  
  const fullHeightify = async (
    videoEle,
    currentVideo,
    overlay,
    botCrop,
    botPos,
    clipStart,
    clipEnd
  ) => {
    await ffmpeg.load();

    const multi = videoEle.current.videoWidth / videoEle.current.offsetWidth;

    // calculate bottom crop coordinates
    const botCropCoords = calculateCropCoords(
      botCrop,
      botPos,
      multi,
      720,
      1280
    );

    const time1 = new Date(clipStart * 1000).toISOString().substr(11, 8);
    const time2 = new Date(clipEnd * 1000).toISOString().substr(11, 8);

    ffmpeg.FS("writeFile", currentVideo.name, await fetchFile(currentVideo));

    // trim the current video
    await ffmpegRunTrim(ffmpeg, time1, time2, currentVideo.name, "trim.mp4");

    // crop the trimmed video
    await ffmpegRunCrop(ffmpeg, botCropCoords, "trim.mp4", "output.mp4");

    var outputData = ffmpeg.FS("readFile", `output.mp4`);

    updateOutputVideo(outputData);
  };

  /**
   * Applies a k3 template
   * @param {*} videoEle
   * @param {*} currentVideo
   * @param {*} overlay
   * @param {*} topCrop
   * @param {*} botCrop
   * @param {*} topPos
   * @param {*} botPos
   * @param {*} clipStart
   * @param {*} clipEnd
   */
  const k3Templify = async (
    videoEle,
    currentVideo,
    overlay,
    topCrop,
    botCrop,
    topPos,
    botPos,
    clipStart,
    clipEnd
  ) => {
    await ffmpeg.load();

    const multi = videoEle.current.videoWidth / videoEle.current.offsetWidth;

    // calculate the top and bottom crop coordinates
    const topCropCoords = calculateCropCoords(topCrop, topPos, multi, 720, 854);
    const botCropCoords = calculateCropCoords(botCrop, botPos, multi, 720, 426);

    const time1 = new Date(clipStart * 1000).toISOString().substr(11, 8);
    const time2 = new Date(clipEnd * 1000).toISOString().substr(11, 8);

    ffmpeg.FS("writeFile", currentVideo.name, await fetchFile(currentVideo));

    // trim the video
    await ffmpegRunTrim(ffmpeg, time1, time2, currentVideo.name, "trim.mp4");

    // crop the trimmed video with the top coordinates
    await ffmpegRunCrop(ffmpeg, topCropCoords, "trim.mp4", "topCrop.mp4");

    // crop the trimmed video with the bottom coordinates
    await ffmpegRunCrop(ffmpeg, botCropCoords, "trim.mp4", "botCrop.mp4");

    var outputFileName = "output.mp4";

    // create the output video
    await ffmpeg.run(
      "-i",
      "botCrop.mp4",
      "-i",
      "topCrop.mp4",
      "-filter_complex",
      "[0:v][1:v]vstack",
      "-c:v",
      "libx264",
      "-preset",
      "superfast",
      outputFileName
    );

    if (overlay) {
      // apply an overlay if one is specified
      ffmpeg.FS("writeFile", overlay.name, await fetchFile(overlay));

      await ffmpeg.run(
        "-i",
        outputFileName,
        "-i",
        overlay.name,
        "-filter_complex",
        "overlay=0:380",
        "-c:v",
        "libx264",
        "-preset",
        "superfast",
        "output_overlay.mp4"
      );

      outputFileName = "output_overlay.mp4";
    }

    var outputData = ffmpeg.FS("readFile", outputFileName);

    updateOutputVideo(outputData);
  };

  const calculateCropCoords = (crop, pos, multi, scaleX, scaleY) => {
    const w = crop.width * multi;
    const h = crop.height * multi;
    const x = pos.x * multi;
    const y = pos.y * multi;

    return `crop=${w}:${h}:${x}:${y},scale=${scaleX}:${scaleY}`;
  };

  async function ffmpegRunTrim(ffmpeg, start, end, inputName, outputName) {
    await ffmpeg.run(
      "-ss",
      start,
      "-to",
      end,
      "-i",
      inputName,
      "-avoid_negative_ts",
      "make_zero",
      "-c",
      "copy",
      outputName
    );
  }

  async function ffmpegRunCrop(ffmpeg, cropCoords, inputName, outputName) {
    await ffmpeg.run(
      "-i",
      inputName,
      "-filter:v",
      cropCoords,
      "-c:v",
      "libx264",
      "-preset",
      "superfast",
      outputName
    );
  }

  function updateOutputVideo(data) {
    const video = document.createElement("video");
    video.controls = true;
    video.autoplay = true;
    video.src = URL.createObjectURL(
      new Blob([data.buffer], { type: "video/mp4" })
    );

    setOutputVideo(
      URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }))
    );
  }

  return { k3Templify, fullHeightify };
}
