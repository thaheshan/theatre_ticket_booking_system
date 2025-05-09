/**
 * @typedef {Object} Genre
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} Movie
 * @property {number} id
 * @property {string} title
 * @property {string} poster_path
 * @property {string} backdrop_path
 * @property {string} overview
 * @property {string} release_date
 * @property {number} vote_average
 * @property {number[]} genre_ids
 * @property {Genre[]=} genres
 */

/**
 * @typedef {Object} CastMember
 * @property {number} id
 * @property {string} name
 * @property {string} character
 * @property {string|null} profile_path
 */

/**
 * @typedef {Object} Video
 * @property {string} id
 * @property {string} key
 * @property {string} name
 * @property {string} site
 * @property {string} type
 */

/**
 * @typedef {Movie & {
*   runtime: number,
*   genres: Genre[],
*   tagline: string,
*   status: string,
*   credits?: {
*     cast: CastMember[]
*   },
*   videos?: {
*     results: Video[]
*   }
* }} MovieDetailsResponse
*/

/**
* @typedef {Object} User
* @property {string} username
* @property {string} password
*/

/**
* @typedef {Object} AuthState
* @property {User|null} user
* @property {boolean} isAuthenticated
*/

/**
* @typedef {Object} ThemeState
* @property {boolean} isDarkMode
*/

/**
* @typedef {Object} FavoritesState
* @property {Movie[]} favorites
*/

/**
* @typedef {Object} ApiResponse
* @property {number} page
* @property {Movie[]} results
* @property {number} total_pages
* @property {number} total_results
*/

