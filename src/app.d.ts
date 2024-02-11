declare global {
  declare namespace App {
    namespace Superforms {
      type Message = {
        type: 'error' | 'success';
        text: string;
      };
    }
  }
}

export {};
