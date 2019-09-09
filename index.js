const tools = require('os-tools');

// finals
CMD_COPY = 'cp';
CMD_PREFIX = 'aws s3';
LS_CMD = 'ls';
CMD_PATH_PREFIX = 's3:/';
CMD_EXCLUDE_PREFIX = '--exclude';
CMD_INCLUDE_PREFIX = '--include';
ALL_DIRS = '*';
ALL_SUBDIRS = '*/*';


const self = module.exports = {

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
    async downloadAllByExtension(s3LocalPath, destPath, extension, lookInSubDirsAlso, timeout) {
        if(!s3LocalPath.startsWith('/')) s3LocalPath = '/' + s3LocalPath;
        if(s3LocalPath.endsWith('/')) s3LocalPath = s3LocalPath.substring(0, s3LocalPath.length-2);
        let includeCmd = CMD_INCLUDE_PREFIX + ' "*' + extension + '"';
        let excludeCmd = CMD_EXCLUDE_PREFIX + ' ' + '"*"';
        let conditionsFullCmd = excludeCmd + ' ' + includeCmd;
        if(!lookInSubDirsAlso)  {
            excludeCmd = CMD_EXCLUDE_PREFIX + ' ' + '"*/*"';
            conditionsFullCmd =  includeCmd + ' ' + excludeCmd
        }
        let copy_command = CMD_PREFIX + ' ' + CMD_COPY + ' ' + CMD_PATH_PREFIX + tools.toStringRepresenation(s3LocalPath) + ' ' + tools.toStringRepresenation(destPath);
        let params_command = '--recursive ' + conditionsFullCmd;
        let full_command = copy_command + ' ' + params_command;
        await tools.runCmd(full_command, false, timeout)
    },

    /**
     * Will download a file from an S3 path.
     *
     * @param s3LocalPath -> the local path of the files in the bucket (/remotes/Samsung)
     * @param destPath -> the path to which the files will be downloaded
     * @param fileName -> the file name incl the extension you wish to look for
     * @param timeout -> how long to wait for the download to complete. NOTICE: IT'S IMPERATIVE
     * TO SET THIS ARG AS THE SHITTY S3 CLI DOESN'T INFORM WHEN IT IS DONE DOWNLOADING FILES.
     */
    async downloadFile(s3LocalPath, destPath, fileName, timeout) {
        if(!s3LocalPath.startsWith('/')) s3LocalPath = '/' + s3LocalPath;
        if(s3LocalPath.endsWith('/')) s3LocalPath = s3LocalPath.substring(0, s3LocalPath.length-2);
        let includeCmd = CMD_INCLUDE_PREFIX + ' "' + fileName + '"';
        let excludeCmd = CMD_EXCLUDE_PREFIX + ' ' + '"*"';
        let conditionsFullCmd = excludeCmd + ' ' + includeCmd;
        let copy_command = CMD_PREFIX + ' ' + CMD_COPY + ' ' + CMD_PATH_PREFIX + tools.toStringRepresenation(s3LocalPath) + ' ' + tools.toStringRepresenation(destPath);
        let params_command = '--recursive ' + conditionsFullCmd;
        let full_command = copy_command + ' ' + params_command;
        await tools.runCmd(full_command, false, timeout)
    },


    /**
     * Will run an ls command in a given path destination
     *
     * @param bucketName -> the name of your bucket
     * @param s3LocalPath -> the local path to the destination (for root leave as is)
     * @param listFiles -> set to true if you want to get the files
     * @param listDirs -> set to true if you want to get the dirs
     * @return array -> of
     */
    async listFilesAndDirs(bucketName, s3LocalPath = "", listFiles=true, listDirs=true) {
        return new Promise(async function (resolve, reject) {
            if(s3LocalPath.startsWith('/')) s3LocalPath = s3LocalPath.substring(1);
            if(!s3LocalPath.endsWith('/')) s3LocalPath += '/';

            let full_command = CMD_PREFIX + ' ' + LS_CMD + " " + CMD_PATH_PREFIX + "/" + bucketName + "/" + s3LocalPath + " " + "--human-readable --summarize";
            let dirs = [];
            let files = {};
            let pattern = /[^ ]+/g;
            await tools.runCmd(full_command, false, null, function (data) {
                let info = data.split('\n');
                info = info.filter(function (el) {
                    return el !== "";
                });
                for (let i = 0; i < info.length; i++) {
                    let line = info[i].trim();

                    // it is a dir
                    if (line.startsWith('PRE')) {
                        line = line.replace('PRE ', '');
                        dirs.push(line)
                    } else {
                        // it is a file
                        let arr = line.match(pattern);
                        if(arr[4] === undefined){
                            continue
                        }
                        files[arr[4]] = {
                            'dateMade': arr[0],
                            'timeMade': arr[1],
                            'size': arr[2] + arr[3]
                        };
                    }
                }

            }, function () {
                if(listFiles && !listDirs){
                    resolve(files)
                } else if(!listFiles && listDirs){
                    resolve(dirs)
                } else {
                    resolve([dirs, files])
                }
            });
        }.bind())
    }
};