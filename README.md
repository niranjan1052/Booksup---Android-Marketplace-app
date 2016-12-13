# Module 4 group project #

__Submitted by:__ WebCrows

__Note:__ Client code is present in folder named "webcrows" and server code is present in file named "app.js". Server is hosted on heroku.

__Team members:__
- tulaj001@umn.edu
- balan016@umn.edu
- karup002@umn.edu
- nayan003@umn.edu
- rich1044@umn.edu

__Heroku URL (server is hosted on heroku):__ https://module4server.herokuapp.com

__Argument of ambition:__

We wanted to develop an android application which showcases a wide gamut of features. Following is the list of features: 

###### Implemented barcode scanner 
   - Made use of react-native-barcodescanner.

   - Added custom code to disable camera after scanning the first instance of barcode.

   - Without the custom code, the external package continues to push new scenes on to the navigation stack as long as the camera is pointed at the barcode.

   - User also has the option to key in ISBN in case the book's barcode is damaged.

###### Implemented native camera
   - Used an external package called react-native-camera.

   - This is the second feature that makes use of mobile platform.
   
###### Used an external API to upload images:
   - We made use of the following post API provided by Imgur to upload the images: https://api.imgur.com/3/image 
   
   - This allowed us to save space in our database.
   
###### Kept user input to a minimum while uploading new books:
   - User just needs to scan the barcode of the book and enter the price.
      
   - All other details of the book are fetched from the following google API: https://www.googleapis.com/books/v1/volumes?q=<ISBN>
   
###### Multiple user support: 
   - Each user can upload new books 
   - Each user can add books posted by other users to his interest list 
   - User has his own personalized upload list and interest list 

###### Edit content:
   - User can edit the price of the book
   
###### Delete content:
   - User can delete the books uploaded by him 

###### Search by title

###### Local user authentication

__Argument of execution:__

We believe we have come up with a decent android application which has all the above mentioned features. The project is well structured and is divided into several modules for ease of maintaineance (modules are: assets, components, images, screens, services, styles). 

For styling, we made use of NativeBase and also custom components as deemed necessary. 

10 APIs have been implemented on server and these APIs are responsible for communication between client and database. 

Also, we faced a scenario where we had to pass a scene itself as a prop to the next scene so that data can be passed back from the new scene to the old scene when the new scene is popped from navigation stack. Had fun implementing this feature. 

## Screenshots ##

###### Login 

<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/login.jpeg" alt="Login" width="250" height="400"/>

###### Explore 
<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/explore.jpeg" alt="Login" width="250" height="400"/>

###### Drawer
<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/drawer.jpeg" alt="Login" width="250" height="400"/>

###### My Uploads 
<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/my_uploads.jpeg" alt="My Uploads" width="250" height="400"/>

###### My Interests
<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/my_interests.jpeg" alt="My Interests" width="250" height="400"/>

###### Book details
<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/book_details.jpeg" alt="Book details" width="250" height="400"/>

###### Search feature 
<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/search_feature.jpeg" alt="Search" width="250" height="400"/>

###### Barcode scanner
<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/barcode_s.jpeg" alt="Barcode Scanner" width="250" height="400"/>

###### Image upload
<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/img_upload.jpeg" alt="Login" width="250" height="400"/>

###### Auto populate book details
<img src="https://github.com/umn-5117-f16/module-4-group-project-webcrows/blob/master/auto_populate_book_details.jpeg" alt="Login" width="250" height="400"/>

## Intro ##
You've conquered static sites, server-side programming, and client-side
programming. Now the only thing standing between you and total web domination
is _mobile_, but not for long!

Your task now is to create an Android app using _react-native_.

## Requirements ##
You must create a mobile app. What it does exactly is up to you. It must meet
these requirements:

- has multiple views
- utilizes the mobile platform. This means you need to use something
  that you only get on mobile or that mobile makes easy. This could be the
  camera, microphone, gps, etc.
- has a server-side component that enables user-user interaction. This doesn't
  need to be explicit interaction such as messaging, although it can be. It
  just needs to be a way for one of your user's actions to affect another
  user's experience of the app. As an example, giving a user a stream of
  pictures submitted by other users would satisfy this requirement.

## Project proposals ##
Since you are being given a lot of freedom in what your mobile app does we want
to give you a chance to normalize your expectations with your peers. On pitch
day we expect you to have a 2 minute presentation of your idea ready to
present. This should __include sketches__ that illustrate what it will do.
You can give this presentation via slideshow, on paper, or any other means that
you believe can effectively convey your idea.

Pitch day will still run in much the same way as before. Expect to give your
presentation a couple of times to groups of five to ten people.

## A note on reusing code ##
You are free to reuse any code from module 2 or module 3 if you desire to.
However, __this will reduce our evaluation of the technical ambition of your
project__ so you will need to attempt something more technically challenging
overall to achieve the same grade.

## Submission ##
- Your code should be pushed up to your repo on github
- Fill this `README.md` out with your team name and team members' emails

## Grading ##
You will be graded on the __ambition__ and __execution__ of the project. At the
top of this `README.md` you have the opportunity to argue why your submission
was ambitious and well executed. In order for us to grade it, you must have it
hosted on Heroku. To earn an "A" grade, a project must be technically
ambitious, well-executed, and polished. To earn a passing grade, a project must
minimally fulfill the three requirements listed in the description.
