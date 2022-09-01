export class QueryObject {
    isSortAsc: boolean;
    sortBy: string;
    pageCount: number;
    page: number;
    pageSize: number;
    searchString: string;
}

export class articleQueryObject extends QueryObject {
    status: number;
    season: number;
    twentyFourHourTiming: number;
    publishDateEnumSelectedOption: number;
    publishDate_From: Date;
    publishDate_To: Date;
}
