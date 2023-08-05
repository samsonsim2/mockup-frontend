# Mockup Frontend

![ezgif com-video-to-gif](https://github.com/samsonsim2/mockup-frontend/assets/106437135/52cc4686-73b2-4c70-a739-0d6af885db0d)

Full-stack web app that allows users to create mock-ups for various Instagram ad formats, making it easier for non-creatives with no software knowledge to create mock-ups for pitches and client presentation.

## Context

Marketing campaigns often involve the need to create multiple mock-ups of ads. Mock-ups are used for pitching, communicating ideas to clients, and documentation of projects.
However, creating them is often tedious and usually only handled by a designer who has software skills (Photoshop and Illustrator). It is often challenging for non-design stakeholders  such as the client solutions partner or account manager to create mock-ups on their own because they do not have software knowledge / have access to the same assets provided to the designer. 

Example of mock-ups (Explaining user ad-experience Instagram-client landing page) : 

![image](https://github.com/samsonsim2/mockup-frontend/assets/106437135/15e6d7d4-0758-49ef-acbd-2bedf8aa9d66)

Example of mock-ups (Asset visualisation across various IG formats) : 
![image](https://github.com/samsonsim2/mockup-frontend/assets/106437135/e0b2f8f5-aa5e-48f5-9374-319043d76595)



## Solution 

Create an app that eases the creation of mock-ups by providing templates and a web-based tool.

Allow non-designers to participate in the process. Clients, account managers, and copywriters can also create mock-ups easily without having to touch design software.  

## Features

* User Login with Auth0

* Basic CRUD functionality (Users can delete and edit mock-ups and all changes made to their inputs can be saved) 

* User can share mockups with other stakeholders via email invite  
![Share](https://github.com/samsonsim2/mockup-frontend/assets/106437135/d0b1ad44-e870-4543-b9cc-ef72c205427a)

* **Creating a mockup:** Brand's IG profile picture and user name are automatically translated across all IG ad formats upon creation. Users are also provided 4 different common IG formats to visualise their ads(IG feed ad, IG Story ad, IG Reels Ad,IG Filter) and an overlay that demarcates the safe zone(to help clients visualise the optimal placement for text).

![Animation](https://github.com/samsonsim2/mockup-frontend/assets/106437135/40ff00f9-c3b1-49f1-9aa1-8e6f7a75fd1c)

* **Uploading assets:** User is given a range of stock assets from influencer placeholder to product shots, but can also upload their own assets that will be used for their campaign. These assets will be saved once uploaded and the user can share the mock-up session with other stakeholders too, who will then have access to the same assets.
![Upload assets](https://github.com/samsonsim2/mockup-frontend/assets/106437135/e624f5f9-0d3b-4015-93b7-a64365724291)

* **Image manipulation + Export:** User can adjust brightness/saturation/contrast of the image, sketch over mock-up, and crop images. The final output is then exported as a png with transparent background that can be used for presentation decks.) 
![Imagemanipulation](https://github.com/samsonsim2/mockup-frontend/assets/106437135/82c17bef-71ae-4954-9871-097aeddefbbd)

* **Draggable Stickers + editable components:** User can also add in IG elements such as location stickers, and easily edit text on the mock-up without having to rely on the designer. This helps to cut-down back and forth time and speeds up communication with clients.
![DragableSticker](https://github.com/samsonsim2/mockup-frontend/assets/106437135/2ceb46f8-55af-42d2-a00f-d6a98658bbd6)

## Tech Stack: 
* Front end: React, Cropper-JS (cropping functionality), Email-JS (sending invites to collaborate on mockups), html5Canvas
* UI: Material UI
* Storage: Firebase
* Backend: Node, Express, Sequelize
* Database: PostgreSQL
* Authorization: Auth0

## Future Improvements
* Add more formats such as Tiktok ads, and Facebook Ads
* Add gif editing functionality
* Social media scheduling

## Contributors 
* Samson Sim

