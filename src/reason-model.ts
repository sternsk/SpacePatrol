/*
** this file is created automatically by ReflectionLab.java and will be replaced periodically
*/ 
import * as m0 from './root-model.js';
import * as m1 from './service-api-model.js';
import * as m2 from './reason-model.js';
export interface Reason extends m0.GenericEntity {
  reasons: Reason[];
  text: string;
}
export interface HasFailure extends m0.GenericEntity {
  failure: Reason;
}
