/// <reference path="bower_components/polymer/types/polymer-element.d.ts" />
/// <reference path="types/polymer/types/lib/utils/flattened-nodes-observer.d.ts" />
/// <reference path="bower_components/polymer-decorators/polymer-decorators.d.ts" />
export interface IViewMap {
    [index: string]: IViewport;
}
export declare class DeckGl extends Polymer.Element {
    static is: string;
    deck: Deck;
    layers: Array<Node> | null;
    _childrenObserver: Polymer.FlattenedNodesObserver | null;
    static readonly template: HTMLTemplateElement;
    connectedCallback(): void;
    disconnectedCallback(): void;
    _slotChanged(): void;
    pickObject(e: IDeckPickObject): any;
    pickObjects(e: IDeckPickObjects): any;
    _updateFromProps(nextProps: any): void;
    _extractJSXLayers(children: any): {
        layers: null;
        children: any[];
    };
    _renderChildrenUnderViews(children: Array<Node>): any[];
    _positionChild(child: any, viewMap: IViewMap, i: number): any;
    render(): any;
}
