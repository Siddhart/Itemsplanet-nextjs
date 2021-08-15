## Itemsplanet.com

Itemsplanet is a website where you can find all sorts of cool items.

## Process
For this project I looked into the [JAM stack](https://jamstack.org/). Its a project that has a lot of pages. And I don't really have a server where I can render everything serverside. The JAMstack was my best option in this situation. As the Static Site Generator I used [Next.js](https://nextjs.org/). For my Content Management System i used [GraphCMS](https://graphcms.com/). The user is scrolling down to see the items. When the user has reached the end of the file it will show a button which says "show more". When the user clicks on this button it will render the data of the chunk. The generateChunks.js file basically scrapes all the data form the cms and generates chunks with it. These chunks will be locally fetched on the client side.

## To-Do list Short Term
- [X] Build the Main page
- [X] Build the Item page
- [X] Build the Blog page
- [X] Build the Featured items page
- [X] Build the Blogs page
- [X] Build the categories page
- [X] Add firebase support(oh boi I didn't think I would have reached it so far. Well here goes nothing.)
- [X] Add supabase support(well i did add firebase support and everything worked but i heard great things about supabase. so lets try that one and see how it goes )

## To-Do list Long Term
- [ ] Remove all the shitcode
- [X] Fix the css(I thought it was a good idea to split up all the css for every page. butttt it really wasn't a good idea so i have to redo that part)
