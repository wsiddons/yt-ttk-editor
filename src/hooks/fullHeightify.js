export const fullHeightify = async (
    videoEle, currentVideo, 
    overlay, botCrop, botPos, clipStart, clipEnd, 
    createFFmpeg, fetchFile,
    setOutputVideo
    ) => {

    console.log(overlay)
    const multi = videoEle.current.videoWidth / videoEle.current.offsetWidth

    //botcrop
    const wTop2 = botCrop.width * multi
    const hTop2 = botCrop.height * multi
    const xTop2 = botPos.x * multi
    const yTop2 = botPos.y * multi

    const botCropCoords = `crop=${wTop2}:${hTop2}:${xTop2}:${yTop2},scale=720:1280`
        console.log(botCropCoords)

    const ffmpeg = createFFmpeg({
        log: true
    })

    await ffmpeg.load()

    const time1 = new Date(clipStart * 1000).toISOString().substr(11, 8)
    const time2 = new Date(clipEnd * 1000).toISOString().substr(11, 8)

    ffmpeg.FS('writeFile', currentVideo.name, await fetchFile(currentVideo))
    
    await ffmpeg.run('-ss', time1,'-to', time2, '-i', currentVideo.name,  '-avoid_negative_ts', 'make_zero', '-c', 'copy', 'trim.mp4')

    await ffmpeg.run('-i', 'trim.mp4', '-filter:v', botCropCoords, '-c:v', 'libx264', '-preset', 'superfast', 'output.mp4')



        var data = ffmpeg.FS('readFile', `output.mp4`)

        const video = document.createElement('video')   
        video.controls = true
        video.autoplay = true
        video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
    
        setOutputVideo(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' })))
    
   

}