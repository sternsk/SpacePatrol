/*
** this file is created automatically by ReflectionLab.java and will be replaced periodically
*/ 
import * as m0 from './root-model.js';
import * as m1 from './service-api-model.js';
import * as m2 from './reason-model.js';
export interface GenericProcessingRequest extends ServiceRequest {
}
export interface NonInterceptableRequest extends ServiceRequest {
}
export interface AuthorizedRequest extends AuthorizableRequest {
}
export interface InstanceId extends m0.GenericEntity {
  applicationId: string;
  nodeId: string;
}
export interface InternalPushRequest extends PushRequest {
}
export interface PushRequest extends PushAddressing, AuthorizedRequest, GenericProcessingRequest, HasServiceRequest {
}
export interface AsynchronousRequestCallbackRequest extends DispatchableRequest, DomainRequest {
  correlationId: string;
  customData: string;
}
export interface AuthorizedPreProcessRequest extends PreProcessRequest, AuthorizedRequest {
}
export interface PlatformRequest extends ServiceRequest {
}
export interface ExecuteInDomain extends DomainRequest, GenericProcessingRequest, HasServiceRequest {
}
export interface AuthorizedPostProcessRequest extends PostProcessRequest, AuthorizedRequest {
}
export interface ResponseEnvelope extends ServiceResult {
  result: any;
}
export interface CompositeResponse extends m0.GenericEntity {
  results: ServiceResult[];
}
export interface DomainRequest extends ServiceRequest {
  domainId: string;
}
export interface StillProcessing extends ServiceResult {
}
export interface InterceptorRequest extends GenericProcessingRequest, NonInterceptableRequest {
  processorIdentification: string;
  serviceDomainId: string;
}
export interface ServiceResult extends m0.GenericEntity {
}
export interface AsynchronousRequestCallbackStatusRequest extends AsynchronousRequestCallbackRequest {
  percentage: number;
}
export interface ExecuteAuthorized extends AuthorizableRequest, GenericProcessingRequest, HasServiceRequest {
}
export interface Unsatisfied extends ServiceResult {
  hasValue: boolean;
  value: any;
  why: m2.Reason;
}
export interface CallbackPushAddressing extends PushAddressing {
  serviceId: string;
}
export interface MulticastResponse extends m0.GenericEntity {
}
export interface AuthorizedAroundProcessRequest extends AroundProcessRequest, AuthorizedRequest {
}
export interface OverridingPostProcessResponse extends PostProcessResponse {
  response: any;
}
export interface HasServiceRequests extends m0.GenericEntity {
  requests: ServiceRequest[];
}
export interface InterceptorResponse extends m0.GenericEntity {
}
export interface AsynchronousRequestProcessorCallback extends AsynchronousRequestCallback {
  callbackProcessorCustomData: string;
  callbackProcessorId: string;
  callbackProcessorServiceDomain: string;
}
export interface CompositeRequest extends AuthorizableRequest, GenericProcessingRequest, HasServiceRequests {
  continueOnFailure: boolean;
  parallelize: boolean;
}
export interface AsynchronousRequest extends AuthorizedRequest, NonInterceptableRequest, GenericProcessingRequest, HasServiceRequest {
  callback: AsynchronousRequestCallback;
  correlationId: string;
  priority: number;
}
export interface UnicastRequest extends AuthorizedRequest, NonInterceptableRequest, GenericProcessingRequest, HasServiceRequest {
  addressee: InstanceId;
  asynchronous: boolean;
  timeout: number;
}
export interface PushResponse extends m0.GenericEntity {
  responseMessages: PushResponseMessage[];
}
export interface AsynchronousRequestCallbackCompletionRequest extends AsynchronousRequestCallbackRequest {
  failure: Failure;
  result: any;
}
export interface StandardRequest extends DispatchableRequest, AuthorizedRequest {
}
export interface Failure extends ServiceResult {
  cause: Failure;
  details: string;
  message: string;
  notification: ServiceRequest;
  suppressed: Failure[];
  tracebackId: string;
  type: string;
}
export interface PreProcessResponse extends InterceptorResponse {
  overriddenRequest: ServiceRequest;
}
export interface AuthorizableRequest extends ServiceRequest {
  sessionId: string;
}
export interface PersistedServiceRequest extends HasServiceRequest {
  requestor: string;
  requestorIpAddress: string;
  requestorSessionId: string;
}
export interface HasServiceRequest extends m0.GenericEntity {
  serviceRequest: ServiceRequest;
}
export interface AroundProcessResponse extends InterceptorResponse {
  response: any;
}
export interface ServiceRequest extends m0.GenericEntity {
}
export interface DispatchableRequest extends ServiceRequest {
  serviceId: string;
}
export interface PushResponseMessage extends m0.GenericEntity {
  clientIdentification: string;
  details: string;
  message: string;
  originId: InstanceId;
  successful: boolean;
}
export interface PostProcessRequest extends InterceptorRequest {
  postProcessorIdentification: string;
  response: any;
}
export interface AroundProcessRequest extends InterceptorRequest, HasServiceRequest {
  processorComponentType: string;
  remainingProcessorIdentifications: string[];
}
export interface AsynchronousRequestRestCallback extends AsynchronousRequestCallback {
  basicAuthenticationPassword: string;
  basicAuthenticationUser: string;
  callbackProcessorServiceDomain: string;
  customData: string;
  endpointServiceId: string;
  statusUrl: string;
  url: string;
}
export interface PostProcessResponse extends InterceptorResponse {
}
export interface MulticastRequest extends AuthorizedRequest, NonInterceptableRequest, GenericProcessingRequest, HasServiceRequest {
  addressee: InstanceId;
  asynchronous: boolean;
  sender: InstanceId;
  timeout: number;
}
export interface PushAddressing extends m0.GenericEntity {
  clientIdPattern: string;
  pushChannelId: string;
  rolePattern: string;
  sessionIdPattern: string;
}
export interface PreProcessRequest extends InterceptorRequest, HasServiceRequest {
  preProcessorIdentification: string;
}
export interface AsynchronousRequestCallback extends m0.GenericEntity {
}
export interface AsynchronousResponse extends m0.GenericEntity {
  correlationId: string;
}
