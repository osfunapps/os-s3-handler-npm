const tools = require('os-tools');

// finals
CMD_COPY = 'cp';
CMD_PREFIX = 'aws s3';
CMD_PATH_PREFIX = 's3:/';

const self = module.exports = {

    /**
     * Will download files with to the same extension from an S3 path.
     *
     * @param s3LocalPath -> the local path of the files in the bucket (/remotes/Samsung)
     * @param destPath -> the path to which the files will be downloaded
     * @param extension -> the extension you wish to look for
     * @param timeout -> how long to wait for the download to complete. NOTICE: IT'S IMPERATIVE
     * TO SET THIS ARG AS THE SHITTY S3 CLI DOESN'T INFORM WHEN IT IS DONE DOWNLOADING FILES.
     */
    async downloadAllByExtension(s3LocalPath, destPath, extension, timeout) {
        let copy_command = CMD_PREFIX + ' ' + CMD_COPY + ' ' + CMD_PATH_PREFIX + tools.toStringRepresenation(s3LocalPath) + ' ' + self.stringifiy(destPath);
        let params_command = '--recursive --exclude "*" --include "*' + extension + '" ';
        let full_command = copy_command + ' ' + params_command;
        await tools.runCmd(full_command)
    },

    /**
     * Will download a file from S3. If you don't know the path just leave blank.
     *
     * @param s3LocalPath -> the local path of the files in the bucket (/remotes/Samsung)
     * @param destPath -> the path to which the files will be downloaded
     * @param fileNameWithExtension -> the name of the file, carrying the file extension
     * @param timeout -> how long to wait for the download to complete. NOTICE: IT'S IMPERATIVE
     * TO SET THIS FIELD AS THE SHITTY S3 CLI DOESN'T INFORM WHEN IT IS DONE DOWNLOADING FILES.
     */
    async downloadFile(s3LocalPath, destPath, fileNameWithExtension, timeout) {
        let copy_command = CMD_PREFIX + ' ' + CMD_COPY + ' ' + CMD_PATH_PREFIX + s3LocalPath + ' ' + tools.stringifiy(destPath);
        let params_command = '--recursive --exclude "*" --include "' + fileNameWithExtension + '" ';
        let full_command = copy_command + ' ' + params_command;
        console.log(full_command);
        await tools.runCmd(full_command, timeout)
    },
};