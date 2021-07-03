This website is the result of a hard and a serious work.
my mission in my end-of-the-year project was to implement an
application of course management using different and new tools.
# Tools : 
In this project we used MERN architecture :


FrontEnd : **ReactJS** (styling : **MaterialUI** && **CSS**)

Backend : **NodeJS** + **ExpressJS**

DB : **MongoDB** through Mongoose
### _other tools_ :
POSTMAN

JWT

BCRYPT

GITHUB

GIT

TRELLO

FIGMA
# diagrams (uml): 

i am sorry that these diagrams are in french

### use case diagrams : 
##### _admin and visitor :_
![admin](https://h.top4top.io/p_2010jdw511.png)
##### _student :_
![Student](https://d.top4top.io/p_2010i15r61.png)
##### _instructor :_
![instructor](https://e.top4top.io/p_2010y0sc82.png)

### class diagrams : 
![instructor](https://k.top4top.io/p_2010xss224.png)
### sequence diagrams : 
##### _authentication :_
![instructor](https://j.top4top.io/p_2010fna4l3.png)
##### _registration :_
![instructor](https://i.top4top.io/p_201092hxa2.png)

# Interfaces : 
#### HomePage : 
![homepage](https://h.top4top.io/p_2010vp3xy1.png)
#### AllCourses : 
![AllCourses](https://b.top4top.io/p_2010qrssj7.png)
#### SignIn : 
![SignIn](https://j.top4top.io/p_2010ymjhy3.png)
#### SignUp : 
![SignUp](https://k.top4top.io/p_2010dwlea4.png)
#### Student Dashboard : 
![Student Dashboard](https://a.top4top.io/p_2010c8hcm6.png)
#### Instructor Dashboard : 
![Instructor Dashboard](https://l.top4top.io/p_2010tntws5.png)
#### Admin Dashboard : 
![Admin Dashboard](https://i.top4top.io/p_2010v7dcu2.png)
#### Enroll Page : 
![Enroll](https://c.top4top.io/p_2010l7l998.png)
#### Learning Page : 
![Learning](https://e.top4top.io/p_2010uyyca10.png)
#### Certification : 
![Certification](https://d.top4top.io/p_2010qs8wl9.png)

# API endPoints : 
in french again 
Route : /contact

Méthode : POST

Description : page de contacte


Route : /users

Méthode : POST

Description : inscription


Route : /auth

Méthode : POST

Description :  authentification


Route : /deleteAccount

Méthode : DELETE

Description :  supprimer le compte


Route : /addCourse

Méthode : POST

Description : Ajouter un cours


Route : /addChapter

Méthode : POST

Description : Ajouter un chapitre


Route : /allCourses

Méthode : GET

Description : demander les informations de tous les cours


Route : /allStudents

Méthode : GET

Description : demander les informations de tous les étudiant


Route : /allProfs

Méthode : GET

Description : demander les informations de tous les profs


Route : /allFormations

Méthode : GET

Description : demander les informations de tous les formations


Route : /addFormation

Méthode : POST

Description : Ajouter une formation


Route : /enrollCourse

Méthode : POST

Description : s'inscrire à un cours


Route : /enrollFormation

Méthode : POST

Description : s'inscrire à un cours


Route : /myCourses

Méthode : GET

Description : demander mes cours


Route : /myFormations

Méthode : GET

Description : demander mes formations


Route : /searchCourse

Méthode : POST

Description : demander un cours specifié


Route : /searchFormation

Méthode : POST

Description : demander une formation specifiée


Route : /bestCourses

Méthode : GET

Description : demander les 4 meilleurs cours


Route : /getCourse

Méthode : POST

Description : demander les informations d'un cours


Route : /getFormation

Méthode : POST

Description : demander les informations d'une formation


Route : /myStartedCourses

Méthode : GET

Description : demander mes cours commencés


Route : /myStartedFormations

Méthode : GET

Description : demander mes formations commencées


Route : /myFinishedFormations

Méthode : GET

Description : demander mes formations términées


Route : /myFinishedCourses

Méthode : GET

Description : demander mes cours términés


Route : /isStudent

Méthode : GET

Description : demander si un utilisateur est un etudiant ou un prof


Route : /addPic

Méthode : POST

Description : ajouter l'image d'un cours


Route : /getNumberOfChapters

Méthode : POST

Description : demander le nombre de chapitre d'un cours


Route : /getNumberOfCourses

Méthode : POST

Description : demander le nombre de cours d'une formation


Route : /startCourse

Méthode : POST

Description : commencer un cours


Route : /startFormation

Méthode : POST

Description : commencer une formation


Route : /finishCourse

Méthode : POST

Description : terminer un cours


Route : /finishFormation

Méthode : POST

Description : terminer une formation


Route : /getChapters

Méthode : POST

Description : demander les chapitres d'un cours


Route : /setCurrentChapter

Méthode : POST

Description : changer le numéro de chapitre courant d'un cours pour un etudiant


Route : /getCurrentChapter

Méthode : POST

Description : demander le numéro de chapitre courant d'un cours pour un etudiant


Route : /addFormation

Méthode : POST

Description : ajouter une formation


Route : /FillFormation

Méthode : POST

Description : ajouter les cours d'une formation


Route : /getMark

Méthode : POST

Description : demander la note/review d'un cours


Route : /setMark

Méthode : POST

Description : demander la note/review d'un cours


Route : /unenrollCourse

Méthode : POST

Description : se désincrire d'un cours


Route : /unenrollFormation

Méthode : POST

Description : se désincrire d'une formation


Route : /getCurrentCourse

Méthode : POST

Description : demander le numéro de cours courant d'une formation pour un etudiant


Route : /setMarkFormation

Méthode : POST

Description : ajouter/changer la note/review d'une formation


Route :/getCourseStudents

Méthode : POST

Description : demander les etudiants inscrits dans un cours


Route : /setTestMark

Méthode : POST

Description : ajouter/changer la note d'un etudiant dans un test


Route : /admin/auth

Méthode : POST

Description : authentification d'admin


Route : /admin/register

Méthode : POST

Description : inscription d'admin


Route : /deleteCourse

Méthode : DELETE

Description : supprimer un cours


Route : /deleteFormation

Méthode : DELETE

Description : supprimer une formation


Route : /deleteStudent

Méthode : DELETE

Description : supprimer un etudiant


Route : /deleteProf

Méthode : DELETE

Description : supprimer un prof


Route : /admin/changePassword,/prof/changePassword,/changePassword

Méthode : POST

Description : changer le mot de passe


Route : /getFormationCourses

Méthode : POST

Description : demander les cours d'une formation

# How to run this app:

first clone the repository 

then run this command : `npm i`

then after you change the credentiels and environnement variables by yours

run `npm run dev`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

##### *all rights reserved*

# By Oubaydos
