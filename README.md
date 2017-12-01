# Alarm
This is an alarming and timer total online and client side (maybe later add some accounting) to manage time in a beautiful way

Please check the latest change on [index.html](https://htmlpreview.github.io/?https://github.com/easa/Alarm/blob/master/index.html). this file sould be stand alone! all the functions sould work on client device.


### This is a structured program
This is a structured program so you can develope it and use it in your other project easily.
The functions make namespaces and the namespaces make all codes clean to read and manipulate.
The layers are as follow:
-- The **View Layer**
Thich is what ever is appearing on page, it contains all HTML files and Js files with the same name as the HTML files'.
-- The **Business Layer** (controller)
This is going to carry all the functions through the program and control the main functionality of it.
-- The **Model Layer** 
This is deferent from Data Layer because actully data layer should save data but this is just for shape items and help to construct them. I guess I'll use some library for the data layer.