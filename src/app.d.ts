declare global {
  declare namespace App {
    interface Locals {
      lang: string | undefined;
    }
    namespace Superforms {
      type Message = {
        type: 'error' | 'success';
        text: string;
      };
    }
  }
}

export {};
