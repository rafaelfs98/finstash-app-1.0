/* eslint-disable @typescript-eslint/no-explicit-any */

import Cache from "./Cache";
import fetcher from "../services/fetcher";

export type TransformData<T = any> = (data: T) => T;

export type APIParametersOptions = {
  customParams?: { [key: string]: unknown };
  fields?: string;
  order?: string;
  page?: number | string;
  pageSize?: number | string;
  sort?: string;
};

interface RestContructor<ObjectModel = any> {
  fields?: string;
  transformData?: TransformData<ObjectModel>;
  uri: string;
}

class Rest<ObjectModel = any> {
  private cache = Cache.getInstance();
  public fetcher = fetcher;
  public fields: string;
  public resource: string = "";
  public transformData: TransformData = (data) => data;
  public uri: string;

  constructor({
    fields = "",
    transformData,
    uri,
  }: RestContructor<ObjectModel>) {
    this.fields = fields;
    this.uri = uri;
    this.resource = `${uri}`;

    if (fields) {
      this.fields = `select=${fields}`;
      this.resource = `${uri}&${this.fields}`;
    }

    if (transformData) {
      console.log("transformData:", transformData);
      this.transformData = transformData;
    }
  }

  static getPageParameter(
    parameters: APIParametersOptions = {},
    baseURL?: string
  ) {
    const getBaseSearchParams = (resource?: string) => {
      if (resource && resource.includes("?")) {
        return resource.slice(resource.indexOf("?"));
      }
    };

    const searchParams = new URLSearchParams(getBaseSearchParams(baseURL));

    if (parameters.customParams) {
      parameters = {
        ...parameters,
        ...parameters.customParams,
      };

      delete parameters.customParams;
    }

    for (const key in parameters) {
      const value = (parameters as any)[key] as string | number | undefined;

      if (value) {
        searchParams.set(key, value.toString());
      }
    }

    return searchParams.toString();
  }

  public async create(data: any): Promise<ObjectModel> {
    const response = await fetcher.post(`/${this.uri}`, data);

    if (response && response.name) {
      this.cache.set(`${this.uri}/${response.name}`, response);
    }

    return response;
  }

  public async remove(id: number | string): Promise<void> {
    await fetcher.delete(`${this.uri}/${id}`);
  }

  public async update(id: number, data: Partial<any>): Promise<ObjectModel> {
    return fetcher.patch(`${this.resource}?id=eq.${id}`, data);
  }

  public async removeBatch(ids: number[]): Promise<void> {
    await Promise.allSettled(ids.map((id) => this.remove(id)));
  }

  public async updateBatch(
    ids: number[],
    data: Partial<any>[]
  ): Promise<PromiseSettledResult<ObjectModel>[]> {
    return Promise.allSettled(
      data.map((item, index) => this.update(ids[index], item))
    );
  }

  public transformDataFromList(response: ObjectModel[]): ObjectModel[] {
    return Array.isArray(response) ? response.map(this.transformData) : [];
  }
}

export default Rest;
