import { fetchNLTData } from './nltService';
import { Request, Response } from 'express-serve-static-core';
import IPassageStorageService from './../../descriptors/IPassageStorageService';
import { PassageEntryType } from '../../descriptors/PassageEntryType';
import IModuleRequestHandler from '../../descriptors/IModuleRequestHandler';
import { getNormalizedDates } from '../../helpers/dateHelper';
import Logger from '../../logger';
import IMetadataProvider from '../../descriptors/IMetadata';
import ConfigProvider from '../../config/ConfigProvider';

interface PassagesQuery {
    month: number,
    date: number,
    type: string,
    write: boolean
}

export default class PassagesService implements IModuleRequestHandler
{
    constructor(
        private config: ConfigProvider,
        private storage: IPassageStorageService, 
        private metadata: IMetadataProvider,
        private logger: Logger)
    { }

    public requestHandler(request: Request, response: Response) : void {

        const params = (<PassagesQuery>request.query);
        const normalizedDates = getNormalizedDates(params);

        let types:PassageEntryType[] = [];
        if (params.type.includes(','))
        {
            types = params.type.split(',').map(type => <PassageEntryType><unknown>type);
        }
        else
        {
            types.push(<PassageEntryType><unknown>params.type)
        }

        let fetchers: Promise<string>[] = [];

        types.forEach(type => {
            //const ref = this.metadata[normalizedDates.month][normalizedDates.date]['pass'][type];
            const nltRef = this.metadata.getEntry(normalizedDates.ref).pass[type];
            fetchers.push(this.fetchAndWriteData(nltRef, params.write, params.month, params.date, type))
        });

        Promise.all(fetchers).then(data => response.send(data));
    }

    private fetchAndWriteData(nltRef: string, write: boolean, month: number, date: number, type: PassageEntryType) : Promise<string> {
        return fetchNLTData( nltRef, this.config.get("NLT_API_KEY"), this.logger )
        .then(data => {
            if (write)
            {
                this.storage.writePassage(
                    { 
                        month, 
                        date, 
                        entryType: type 
                    }, 
                    data);
            }

            return data;
        })

    }
}

