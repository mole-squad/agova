import * as request from 'request-promise-native';

declare interface IErrResponse {
  message: string;
  statusCode: number;
}

export class HTTPWrapper {
  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  private static instance: HTTPWrapper;

  public get(url: string, returnFullResponse?: boolean) {
    return request.get({
      url,
      headers: this.buildHeader(),
      json: true,
      resolveWithFullResponse: true
    }).then((response) => {
      this.logRequest(response, 'GET', url);
      this.processResponse(response);
      return Promise.resolve(returnFullResponse ? response : response.body);
    }).catch((err) => {
      return this.onError(err, 'GET', url);
    });
  }

  public post(url: string, params: object, returnFullResponse?: boolean) {
    return this.update('POST', url, params, returnFullResponse);
  }

  public put(url: string, params: object, returnFullResponse?: boolean) {
    return this.update('PUT', url, params, returnFullResponse);
  }

  public patch(url: string, params: object, returnFullResponse?: boolean) {
    return this.update('PATCH', url, params, returnFullResponse);
  }

  public delete(url: string, params: object = {}, returnFullResponse?: boolean) {
    return this.update('DELETE', url, params, returnFullResponse);
  }

  public postForm(url: string, formData: object, returnFullResponse?: boolean) {
    return request.post({
      url,
      headers: this.buildHeader(),
      formData,
      resolveWithFullResponse: true
    }).then((response) => {
      this.logRequest(response, 'POST', url, formData);
      this.processResponse(response);
      return Promise.resolve(returnFullResponse ? response : response.body);
    }).catch((err) => {
      return this.onError(err, 'POST', url, formData);
    });
  }

  private update(method, url: string, params: object, returnFullResponse?: boolean) {
    return request({
      method,
      url,
      headers: this.buildHeader(),
      body: params,
      json: true,
      resolveWithFullResponse: true
    }).then((response) => {
      this.logRequest(response, method, url, params);
      this.processResponse(response);
      return Promise.resolve(returnFullResponse ? response : response.body);
    }).catch((err) => {
      return this.onError(err, method, url, params);
    });
  }

  private logRequest(response, method, url: string, params?: object) {
    if (process.env.E2E_DEBUG) {
      // tslint:disable-next-line:no-console
      console.log(`${ response.statusCode } ${ method } ${ url }`);
    }
  }

  private onError(err: IErrResponse, method: string, url: string, params?: object) {
    return Promise.reject(new Error(`${ err.statusCode } ${ method } ${ url } ${ err.message }`));
  }

  private buildHeader(header: object = {}) {
    return {
      
      ...header
    };
  }

  private processResponse(response) {
    const cookies = response.headers['set-cookie'];
    if (cookies && cookies.length) {
      
    }
  }
}