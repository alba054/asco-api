// * T is a generic type for the response after consumption in subscribe method
export abstract class MessagingInterface<T> {
  abstract publish(data: T): Promise<void>;
  abstract subscribe(...args: any): Promise<T | void>;
}
