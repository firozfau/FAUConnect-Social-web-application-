## Getting Started

The web application development roadmap focuses on creating a sensitive individual-based platform where users can securely store personal information and documents for various purposes. While it shares some similarities with a dating application, it is not solely a dating platform. This application strictly limits access to individuals within a specific University (FAU), with its primary goal being knowledge sharing among its members.

Development-short-description: 
* website [Directory]
  ```sh
  1. This directory contains all the required data for launching the client-view web application.
  2. localhost-link: http://localhost/fautogether
  3. Web-link:https://mad-fauconnect.aibe.uni-erlangen.de/
  ```


* admin [Directory]
  ```sh
  1. It is most important for user statistics and support, encompassing technical, social, and analytical aspects.
  2. localhost-link: http://localhost/fautogether/admin/
  3. Web-link:https://mad-fauconnect.aibe.uni-erlangen.de/admin
  ```

* api [Directory]
  ```sh
  This directory contains the main application where we implement the core algorithm for the project"'"s primary goal. It is developed using Python and is not visible to users; it functions behind the scenes as an API.
  ```
* Instruction:
  ```sh
  1. Do not perform any CRUD operations on these directories (admin, api), as both are sensitive and platform-dependent.
  2. If you wish to understand how the (admin, api) side is developed, you can download it to your own PC and test it on your side for educational purposes.
  3. Regarding the website, focus your work on the "website" directory, which is typically used to display website content.
  ```

* 'How to clone project':

 `Install all dependency `
  ```sh
   1. Install Git 
   2. Create ssh-key and add to Git-lab 
   3. Clone with SSH
  ```
  `Manage project`
  ```sh
   1. Open your terminal and visit your directory
   2. CMD=> git checkout main
   2. CMD=> git pull

   1. CMD=> git add .
   2. CMD=> git commit -m "<write short note(with in 10 words),  which purpose you have to push your containt>"
   3. CMD=> git push origin main
  ```
