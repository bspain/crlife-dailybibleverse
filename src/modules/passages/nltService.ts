import fetch from 'node-fetch';
import Logger from '../../logger';

const nltEndpoint = "http://api.nlt.to/api/passages";

export async function fetchNLTData(nltRef: string, logger: Logger) : Promise<string> 
{
    const nltKey = process.env.NLT_API_KEY;
    const request = `${nltEndpoint}?ref=${nltRef}&version=nlt&key=${nltKey}`
    logger.debug(logger.modules.MODULE_PASSAGES, `Fetching NLT.to for ${request}`)

    const response = await fetch(request);
    return response.text();
}
