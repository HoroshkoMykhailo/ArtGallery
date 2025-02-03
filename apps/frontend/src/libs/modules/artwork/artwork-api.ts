import { type AxiosInstance } from 'axios';

import { type ArtWorkApi, type ArtWork as TArtWork } from './types/types.js';

type Constructor = {
  apiPath: string;
  httpApi: AxiosInstance;
};

class ArtWork implements ArtWorkApi {
  private apiPath: string;
  private httpApi: AxiosInstance;

  public constructor({ apiPath, httpApi }: Constructor) {
    this.apiPath = apiPath;
    this.httpApi = httpApi;
  }

  public async getArtWorks(): Promise<TArtWork[]> {
    const { data } = await this.httpApi.get<TArtWork[]>(this.apiPath);

    return data;
  }
}

export { ArtWork };
