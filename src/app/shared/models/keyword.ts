export class Keyword {
    id: number;
    name: string;
    description: string;
}

export class displayValue {
    display: string;
    value: number;
}

export class KeywordBundle {
    articleId: number;
    displayValues: displayValue[]
}
