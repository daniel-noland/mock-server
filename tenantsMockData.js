exports.tenants_data = {
  Message_type: "tenants_data",
  tenants: [
    {
      name: "Alice",
      services_list: [
        {
          service_type: "firewall",
          service_id: "6768ghjg",
          status: "down",
          host_id: "543hjks"
        },
        {
          service_type: "firewall",
          service_id: "kkhk7ggw",
          status: "active",
          host_id: "543hjgs"
        }
      ]
    },
    {
      name: "Bob",
      services_list: [
        {
          service_type: "firewall",
          service_id: "6768g",
          status: "down",
          host_id: "543ks"
        },
        {
          service_type: "firewall",
          service_id: "kkhk7w",
          status: "active",
          host_id: "543hjgggs"
        }
      ]
    }
  ]
};
