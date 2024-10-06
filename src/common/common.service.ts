import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {

    generateSlug(term: string) {
        return term
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/ẞ/g, "ss")
            .replace(/[^a-zA-Z0-9\s]/g, "")
            .trim()
            .replace(/ /g, "-")
            .replace(/--+/g, "-")
            .toLowerCase();
    }

}
