declare module '@deck.gl/core';

interface IDeckPickObject {
  x: number;
  y: number;
  radius: number;
  layerIds: string;
}

interface IDeckPickObjects {
  x: number;
  y: number;
  width: number;
  height: number;
  layerIds: string;
}

interface IViewport {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  getMercatorParams(): any;
  isMapSynched(): boolean;
}

declare class Deck {
  constructor(conf: object);

  finalize(): void;
  pickObject(pick: IDeckPickObject): any;
  pickObjects(pick: IDeckPickObjects): any;
  getViewports(): Array<IViewport>;
}

declare class ArcLayer {

}
