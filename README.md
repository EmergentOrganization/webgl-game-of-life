# WebGL Video Filter

A modification of a Cellular Automata engine.

Known to be compatible with:

 - Xubuntu 14.04, Firefox 42.0
 - Maybe more, let me know at https://www.reddit.com/u/slackermanz if it works.

Program Overview:

A JS/WebGL app for applying colour channel modifications to an image via WebGL shaders.

Intended to be run locally - open index.html in a browser.

4GB+ RAM recommended. Best used with a powerful GPU for WebGL shaders and a good CPU for exporting/downloading large amounts of image data.

This application loads source images (*.png) from the '/Seeds' folder in sequence: 'image000000.png', 'image000001.png' ...

When the index page is opened in a browser, it will preload the source images from '/Seeds'.

Modified image frames can be recorded and downloaded.

----

Source Video to Modified Video workflow:

youtube-dl to get the source video:

    youtube-dl https://www.youtube.com/watch?v=MGyaR2sSBkA

libav-tools to extract the video to *.png images:

    avconv -i Source.mp4 -vsync 1 -r 24 -vf scale=512:256 -an -y 'vidf/image%06d.png'

Copy and rename image000001.png to image000000.png (avconv output starts at 000001)

Copy the *.png images into the 'webgl-game-of-life/Seeds' folder.

Open 'webgl-game-of-life/js/gol.js' and on line 69 set "this.imgcount = 400;" to the number of frames in the 'Seeds' folder. Start with a small number of frames to load - I usually crash out if I try to load more than 1GB of images.

Canvas resolution can be set on line 18 of 'webgl-game-of-life/Index.html', and both must be powers of two. I recommend width="512" height="256" or width="1024" height="512" depending on how powerful your CPU & GPU are.

To run the program, Open 'webgl-game-of-life/Index.html' in your browser (Firefox recommended).

If the program successfully loads the seed images, and the WebGL is all working, the first frame should be shown on WebGL canvas. Uncheck **'Pause'** to play the animation.

The 'Filters' are the WebGL GPU-accelerated transformations applied to each frame. They can be changed by moving the **'Filter #'** bar. They can be applied multiple times per frame with varying results by increasing the **'GPU Frames'** bar.


















