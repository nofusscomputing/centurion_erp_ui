/**
 * 
 * This Object contains many single objects.
 * 
 * @summary A Set of Objects.
 * 
 * @category Backend
 * @expand
 * 
 */
interface APIDataset {

    /**
     * DataObjects part of this dataset.
     */
    results: APIDataObject[];

    /**
     * URLs used for paginated results.
     */
    links: DatasetLinks;

    /**
     * Definitions for dataset.
     */
    meta: DatasetMeta;
}



/**
 * 
 * This set of URLs are used for navigating the paginated results.
 * 
 * @category Backend / Data Type
 * @expand
 */
interface DatasetLinks {

    /**
     * URL to the first page of the complete dataset
     */
    first: URL;

    /**
     * URL of the last page of the complete dataset. Must default to the same
     * value as first if there is only one page of results.
     */
    last: URL;

    /**
     * URL to the next page of results in the complete dataset. Must default to
     * null if there is only one  page of results or there is no next page.
     */
    next: null | URL;

    /**
     * URL to the previous page of results in the complete dataset. Must
     * default to null if the  current page is the first page.
     */
    prev: null | URL;
}


/**
 * @category Backend / Data Type
 * @expand
 */
interface DatasetMeta {

    /**
     * Pagination details.
     */
    pagination: DatasetMetaPagination;
}



/**
 * 
 * Provides the details required for pagination.
 * 
 * @category Backend / Data Type
 * @expand
 */
interface DatasetMetaPagination {

    /**
     * Total number of objects in the complete dataset.
     */
    count: number;

    /**
     * Current page number.
     */
    page: number;

    /**
     * Total number of pages for the complete dataset.
     */
    pages: number;
}
