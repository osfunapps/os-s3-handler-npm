Introduction
------------

This module meant to provide intuitive functions to work with AWS's S3.

## Installation

NOTICE:  
in order to make it work, you would need to install [aws-cli](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)
and run * aws configure * to configure your profile.

Install via npm:
    
    npm i os-s3-handler


## Usage       
Require fsh:
        
    var s3h = require("os-s3-handler")

## Functions and signatures:
    
     /**
     * Will download all of the files with to the same extension from an S3 path.
     *
     * @param s3LocalPath -> the local path of the files in the bucket (/remotes/Samsung)
     * @param destPath -> the path to which the files will be downloaded
     * @param extension -> the extension you wish to look for
     * @param lookInSubDirsAlso -> set to true if you want to download from sub dirs as well
     * @param timeout -> how long to wait for the download to complete. NOTICE: IT'S IMPERATIVE
     * TO SET THIS ARG AS THE SHITTY S3 CLI DOESN'T INFORM WHEN IT IS DONE DOWNLOADING FILES.
     */
    async downloadAllByExtension(s3LocalPath, destPath, extension, lookInSubDirsAlso, timeout)

    /**
     * Will download a file from an S3 path.
     *
     * @param s3LocalPath -> the local path of the files in the bucket (/remotes/Samsung)
     * @param destPath -> the path to which the files will be downloaded
     * @param fileName -> the file name incl the extension you wish to look for
     * @param timeout -> how long to wait for the download to complete. NOTICE: IT'S IMPERATIVE
     * TO SET THIS ARG AS THE SHITTY S3 CLI DOESN'T INFORM WHEN IT IS DONE DOWNLOADING FILES.
     */
    async downloadFile(s3LocalPath, destPath, fileName, timeout) 

    /**
     * Will run an ls command in a given path destination
     *
     * @param bucketName -> the name of your bucket
     * @param s3LocalPath -> the local path to the destination (for root leave as is)
     * @param listFiles -> set to true if you want to get the files
     * @param listDirs -> set to true if you want to get the dirs
     * @return array -> of
     */
    async listFilesAndDirs(bucketName, s3LocalPath = "", listFiles=true, listDirs=true)
    
And more...


## Links -> see more tools
* [os-tools-npm](https://github.com/osfunapps/os-tools-npm) -> This module contains fundamental functions to implement in an npm project
* [os-file-handler-npm](https://github.com/osfunapps/os-file-handler-npm) -> This module contains fundamental files manipulation functions to implement in an npm project
* [os-file-stream-handler-npm](https://github.com/osfunapps/os-file-stream-handler-npm) -> This module contains read/write and more advanced operations on files
* [os-xml-handler-npm](https://github.com/osfunapps/os-xml-handler-npm) -> This module will build, read and manipulate an xml file. Other handy stuff is also available, like search for specific nodes

[GitHub - osfunappsapps](https://github.com/osfunapps)

## Licence
ISC