declare module '*.json' {
  const value: any;
  export default value;
}

declare module 'vue/types/vue' {
  // 在Vue原型上挂载时在这里定义
  interface VueConstructor {
    $utils: IUtils
  }
  interface Vue {
    $utils: IUtils
  }
}

export {};
