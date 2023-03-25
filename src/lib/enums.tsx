/*
OpenSB's SQL file states "The type of the post, 0 is a video, 1 is a legacy video, 2 is art, and 3 is music". Legacy
videos (type 1) were "MPEG-DASH" videos that were uploaded on Qobo's predecessor squareBracket for most of its lifespan.

-GRKB 03/24/2023
*/

export enum PostType {
	Video = 0,
	UnusedType,
	Image,
	Music,
}