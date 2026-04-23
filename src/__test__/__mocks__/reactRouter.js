/**
 * Required when `createRoutesStub` from react-router is used
 */
import { TextEncoder } from 'text-encoding';

import { Request, Response, Headers } from "whatwg-fetch"



global.Request = Request
global.Response = Response
global.Headers = Headers

global.TextEncoder = TextEncoder;
