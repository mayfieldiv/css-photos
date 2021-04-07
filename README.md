# css.photos

https://css-photos.mayfield.workers.dev/

## TODO

1. scorer

   1. compare images
      1. two images of equal size
      2. compares equality of each pixel
      3. all color values within 1% threshold
   2. inverse exponential score from stripped/minified character count
   3. requires rendering html/css to image
      1. frontend - https://github.com/niklasvh/html2canvas
      2. backend - headless chrome
      3. service - https://htmlcsstoimage.com/

2. html/css editor

   - [x] monaco
   - [ ] css intellisense inside html? looks like no (https://github.com/microsoft/monaco-editor/issues/732)
   - [ ] split out css/html editors for intellisense

3. html/css preview

   - [x] slider for preview/target comparison

4. target

   - [x] preview image
   - [x] eyedropper to copy color

5. upload custom image to target

   - [ ] upload image
   - [ ] upload html/css
