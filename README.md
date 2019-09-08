Introduction
------------

This module meant to provide intuitive functions to work with AWS's S3.

## Installation
Install via npm:
    
    npm i os-s3-handler


## Usage       
Require fsh:
        
    var s3h = require("os-s3-handler")

## Functions and signatures:
    
    /**
     * Will download files with to the same extension from an S3 path.
     *
     * @param s3LocalPath -> the local path of the files in the bucket (/remotes/Samsung)
     * @param destPath -> the path to which the files will be downloaded
     * @param extension -> the extension you wish to look for
     * @param timeout -> how long to wait for the download to complete. NOTICE: IT'S IMPERATIVE
     * TO SET THIS ARG AS THE SHITTY S3 CLI DOESN'T INFORM WHEN IT IS DONE DOWNLOADING FILES.
     */
    async downloadAllByExtension(s3LocalPath, destPath, extension, timeout)

    /**
     * Will download a file from S3. If you don't know the path just leave blank.
     *
     * @param s3LocalPath -> the local path of the files in the bucket (/remotes/Samsung)
     * @param destPath -> the path to which the files will be downloaded
     * @param fileNameWithExtension -> the name of the file, carrying the file extension
     * @param timeout -> how long to wait for the download to complete. NOTICE: IT'S IMPERATIVE
     * TO SET THIS FIELD AS THE SHITTY S3 CLI DOESN'T INFORM WHEN IT IS DONE DOWNLOADING FILES.
     */
    async downloadFile(s3LocalPath, destPath, fileNameWithExtension, timeout)
And more...


## Links -> see more tools
* [os-tools-npm](https://github.com/osfunapps/os-tools-npm) -> This module contains fundamental functions to implement in an npm project
* [os-file-handler-npm](https://github.com/osfunapps/os-file-handler-npm) -> This module contains fundamental files manipulation functions to implement in an npm project
* [os-file-stream-handler-npm](https://github.com/osfunapps/os-file-stream-handler-npm) -> This module contains read/write and more advanced operations on files
* [os-xml-handler-npm](https://github.com/osfunapps/os-xml-handler-npm) -> This module will build, read and manipulate an xml file. Other handy stuff is also available, like search for specific nodes

[GitHub - osfunappsapps](https://github.com/osfunapps)

## Licence
ISC