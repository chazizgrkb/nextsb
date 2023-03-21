-- CreateTable
CREATE TABLE `bans` (
    `autoint` INTEGER NOT NULL AUTO_INCREMENT,
    `userid` INTEGER NOT NULL,
    `reason` TEXT NOT NULL,

    PRIMARY KEY (`autoint`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `channel_comments` (
    `comment_id` INTEGER NOT NULL AUTO_INCREMENT,
    `id` TEXT NOT NULL,
    `reply_to` BIGINT NOT NULL DEFAULT 0,
    `comment` TEXT NOT NULL,
    `author` BIGINT NOT NULL,
    `date` BIGINT NOT NULL,
    `deleted` TINYINT NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `comments` (
    `comment_id` BIGINT NOT NULL AUTO_INCREMENT,
    `id` TEXT NOT NULL,
    `reply_to` BIGINT NOT NULL DEFAULT 0,
    `comment` TEXT NOT NULL,
    `author` BIGINT NOT NULL,
    `date` BIGINT NOT NULL,
    `deleted` TINYINT NOT NULL,

    PRIMARY KEY (`comment_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorites` (
    `uid` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `video_id` TEXT NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ipbans` (
    `ip` VARCHAR(45) NOT NULL DEFAULT '0.0.0.0',
    `reason` VARCHAR(255) NOT NULL DEFAULT '<em>No reason specified</em>'
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `music` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `music_id` VARCHAR(11) NOT NULL,
    `title` TEXT NOT NULL,
    `author` INTEGER NOT NULL,
    `time` INTEGER NOT NULL,
    `file` TEXT NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `news` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(128) NOT NULL DEFAULT 'Lorem ipsum',
    `text` TEXT NULL,
    `time` BIGINT NULL DEFAULT 0,
    `redirect` VARCHAR(256) NULL,
    `author_userid` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` INTEGER NOT NULL,
    `level` INTEGER NULL,
    `recipient` INTEGER NOT NULL,
    `sender` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `passwordresets` (
    `id` VARCHAR(64) NOT NULL,
    `user` INTEGER NOT NULL,
    `time` INTEGER NOT NULL,
    `active` TINYINT NOT NULL DEFAULT 1
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rating` (
    `user` BIGINT UNSIGNED NOT NULL,
    `video` BIGINT UNSIGNED NOT NULL,
    `rating` TINYINT UNSIGNED NOT NULL DEFAULT 1
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `revisions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `page` TEXT NOT NULL,
    `revision` INTEGER NOT NULL DEFAULT 1,
    `size` INTEGER NOT NULL DEFAULT 0,
    `sizediff` INTEGER NOT NULL DEFAULT 0,
    `time` INTEGER NOT NULL DEFAULT (current_timestamp()),
    `description` TEXT NOT NULL DEFAULT 'No description',
    `author` INTEGER NOT NULL,
    `comment_id` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `id` INTEGER NOT NULL,
    `user` INTEGER NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag_index` (
    `video_id` INTEGER NOT NULL,
    `tag_id` INTEGER NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tag_meta` (
    `tag_id` INTEGER NOT NULL,
    `name` TEXT NOT NULL,
    `latestUse` BIGINT NOT NULL
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(128) NOT NULL,
    `email` VARCHAR(128) NOT NULL,
    `password` VARCHAR(128) NOT NULL,
    `token` VARCHAR(128) NOT NULL,
    `joined` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `lastview` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `lastpost` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `title` TEXT NOT NULL,
    `about` TEXT NULL,
    `customcolor` VARCHAR(7) NULL DEFAULT '#523bb8',
    `language` VARCHAR(10) NOT NULL DEFAULT 'en-US',
    `avatar` BOOLEAN NOT NULL DEFAULT false,
    `ip` VARCHAR(32) NOT NULL DEFAULT '999.999.999.999',
    `u_flags` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `powerlevel` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `group_id` INTEGER NOT NULL DEFAULT 3,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `videos` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `video_id` VARCHAR(11) NOT NULL,
    `title` VARCHAR(128) NOT NULL,
    `description` TEXT NULL,
    `author` INTEGER UNSIGNED NOT NULL,
    `time` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `most_recent_view` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `views` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `flags` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `category_id` INTEGER NULL DEFAULT 0,
    `videofile` TEXT NULL,
    `videolength` INTEGER UNSIGNED NULL,
    `tags` TEXT NULL,
    `post_type` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `views` (
    `uid` INTEGER NOT NULL AUTO_INCREMENT,
    `video_id` TEXT NOT NULL,
    `user` TEXT NOT NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

