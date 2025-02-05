import { type AxiosInstance } from 'axios';

import { toQueryParameters } from './libs/helpers/helpers.js';
import {
  type ArtWorkApi,
  type ArtWorkQuery,
  type ArtWorkRequestDto,
  type ArtWork as TArtWork
} from './libs/types/types.js';

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

  public async createArtWork(
    artWork: ArtWorkRequestDto,
    image?: File
  ): Promise<TArtWork> {
    const formData = new FormData();

    for (const [key, value] of Object.entries(artWork)) {
      formData.append(key, value.toString());
    }

    if (image) {
      formData.append('image', image);
    }

    const { data } = await this.httpApi.post<TArtWork>(this.apiPath, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return data;
  }

  public async deleteArtWork(id: number): Promise<boolean> {
    const { data } = await this.httpApi.delete<boolean>(
      `${this.apiPath}/${id}`
    );

    return data;
  }

  public async getArtWorks(query: ArtWorkQuery = {}): Promise<TArtWork[]> {
    const queryParameters = toQueryParameters(query);

    const { data } = await this.httpApi.get<TArtWork[]>(
      `${this.apiPath}?${queryParameters}`
    );

    return data;
  }
}

export { ArtWork };
