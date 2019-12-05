const tree_data = [
  {
    title: "第一层 1",
    expand: true,
    children: [
      {
        title: "第二层 1-1",
        expand: true,
        children: [
          {
            select_list: [],
            select_value: "",
            relation: false, // 控制创建关系的显示隐藏
            check_mark: false, //点击对号的效果
            title: "第三层 1-1-1"
          },
          {
            relation: false,
            select_list: [],
            select_value: "",
            check_mark: false,
            title: "第三层 1-1-2"
          },
          {
            relation: false,
            select_value: "",
            check_mark: false,
            select_list: [],
            title: "第三层 1-1-3"
          },
          {
            relation: false,
            check_mark: false,
            select_list: [],
            select_value: "",
            title: "第三层 1-1-4"
          },
          {
            relation: false,
            check_mark: false,
            select_list: [],
            select_value: "",
            title: "第三层 1-1-5"
          },
          {
            check_mark: false,
            relation: false,
            select_list: [],
            select_value: "",
            title: "第三层 1-1-6"
          },
          {
            relation: false,
            check_mark: false,
            select_value: "",
            select_list: [],
            title: "第三层 1-1-7"
          },
          {
            relation: false,
            check_mark: false,
            select_list: [],
            select_value: "",
            title: "第三层 1-1-8"
          }
        ]
      },
      {
        title: "第二层 1-2",
        expand: true,
        children: [
          {
            relation: false,
            check_mark: false,
            select_list: [],
            select_value: "",
            title: "第三层 1-2-1"
          },
          {
            relation: false,
            select_value: "",
            check_mark: false,
            select_list: [],
            title: "第三层 1-2-1"
          }
        ]
      }
    ]
  },
  {
    title: "第一层 2",
    expand: true,
    children: [
      {
        title: "第二层 1-1",
        expand: true,
        children: [
          {
            relation: false,
            check_mark: false,
            select_value: "",
            select_list: [],
            title: "第三层 1-1-1"
          },
          {
            relation: false,
            check_mark: false,
            select_value: "",
            select_list: [],
            title: "第三层 1-1-2"
          }
        ]
      },
      {
        title: "第二层 1-2",
        expand: true,
        children: [
          {
            relation: false,
            check_mark: false,
            select_value: "",
            select_list: [],
            title: "第三层 1-2-1"
          },
          {
            relation: false,
            check_mark: false,
            select_value: "",
            select_list: [],
            title: "第三层 1-2-1"
          }
        ]
      }
    ]
  }
];
export { tree_data };
