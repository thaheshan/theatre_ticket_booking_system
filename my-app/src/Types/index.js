/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} username
 */

/**
 * @typedef {Object} Genre
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Object} Cast
 * @property {number} id
 * @property {string} name
 * @property {string} character
 * @property {string|null} profile_path
 */

/**
 * @typedef {Object} Crew
 * @property {number} id
 * @property {string} name
 * @property {string} job
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
 * @typedef {Object} Movie
 * @property {number} id
 * @property {string} title
 * @property {string} poster_path
 * @property {string} backdrop_path
 * @property {string} overview
 * @property {string} release_date
 * @property {number} vote_average
 * @property {number} vote_count
 * @property {Genre[]} genres
 * @property {number} [runtime]
 */

/**
 * @typedef {Movie & {
 *   tagline?: string,
 *   credits?: {
 *     cast: Cast[],
 *     crew: Crew[]
 *   },
 *   videos?: {
 *     results: Video[]
 *   }
 * }} MovieDetails
 */

/**
 * @typedef {Object} MovieResponse
 * @property {number} page
 * @property {Movie[]} results
 * @property {number} total_pages
 * @property {number} total_results
 */
