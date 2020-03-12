/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare var stripe: any;
declare function Stripe(key: string);
