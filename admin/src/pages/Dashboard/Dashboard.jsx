import adminContext from "../../context/adminContext";
import React, { useState, useContext } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./dashboard.css";

const Dashboard = () => {
  const { allUsers, allOrders, imageList } = useContext(adminContext);
  const [dateFilter, setDateFilter] = useState("month");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Process user growth data
  const processUserGrowthData = () => {
    const monthlyCounts = {};
    
    allUsers.forEach(user => {
      const date = new Date(user.createdAt || Date.now());
      const month = date.toLocaleString('default', { month: 'short' });
      monthlyCounts[month] = (monthlyCounts[month] || 0) + 1;
    });
    
    return Object.entries(monthlyCounts).map(([name, users]) => ({ name, users }));
  };

  // Process order status data
  const processOrderStatusData = () => {
    const statusCounts = {
      placed: 0,
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0
    };
    
    allOrders.forEach(order => {
      const status = order.status?.toLowerCase() || 'placed';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    return [
      { 
        name: "Orders", 
        placed: statusCounts.placed,
        pending: statusCounts.pending,
        confirmed: statusCounts.confirmed,
        shipped: statusCounts.shipped,
        delivered: statusCounts.delivered
      }
    ];
  };

  // Process top products
  const processTopProducts = () => {
    const productCounts = {};
    
    allOrders.forEach(order => {
      order.items?.forEach(item => {
        productCounts[item.name] = (productCounts[item.name] || 0) + (item.quantity || 1);
      });
    });
    
    return Object.entries(productCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, orders]) => ({ name, orders }));
  };

  // Process AI prompts
  const processAIPrompts = () => {
    const promptCounts = {};
    
    imageList.forEach(image => {
      const prompt = image.prompt || "Unknown";
      promptCounts[prompt] = (promptCounts[prompt] || 0) + 1;
    });
    
    return Object.entries(promptCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([prompt, count]) => ({ prompt, count }));
  };

  // Process pie chart data
  const processPieData = () => {
    const statusCounts = {
      placed: 0,
      pending: 0,
      confirmed: 0,
      shipped: 0,
      delivered: 0
    };
    
    allOrders.forEach(order => {
      const status = order.status?.toLowerCase() || 'placed';
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });
    
    return [
      { name: "Placed", value: statusCounts.placed },
      { name: "Pending", value: statusCounts.pending },
      { name: "Confirmed", value: statusCounts.confirmed },
      { name: "Shipped", value: statusCounts.shipped },
      { name: "Delivered", value: statusCounts.delivered }
    ].filter(item => item.value > 0);
  };

  // Calculate KPIs
  const totalUsers = allUsers.length;
  const totalOrders = allOrders.length;
  const totalRevenue = allOrders.reduce((sum, order) => sum + (order.amount || 0), 0);
  const totalAIImages = imageList.length;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">E-commerce Analytics Dashboard</h1>
      
      {/* Filters */}
      <div className="filters-container">
        <div className="filter-group">
          <label className="filter-label">Date Range</label>
          <select
            className="filter-select"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="filter-group">
          <label className="filter-label">Category</label>
          <select
            className="filter-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="home">Home & Kitchen</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <h3 className="kpi-title">Total Users</h3>
          <p className="kpi-value">{totalUsers}</p>
        </div>
        <div className="kpi-card">
          <h3 className="kpi-title">Total Orders</h3>
          <p className="kpi-value">{totalOrders}</p>
        </div>
        <div className="kpi-card">
          <h3 className="kpi-title">Total Revenue</h3>
          <p className="kpi-value">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="kpi-card">
          <h3 className="kpi-title">AI-Generated Images</h3>
          <p className="kpi-value">{totalAIImages}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-row">
        {/* User Growth Chart */}
        <div className="chart-card">
          <h3 className="chart-title">User Growth</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={processUserGrowthData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Chart */}
        <div className="chart-card">
          <h3 className="chart-title">Order Status</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={processOrderStatusData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="placed" fill="#0088FE" />
                <Bar dataKey="pending" fill="#00C49F" />
                <Bar dataKey="confirmed" fill="#FFBB28" />
                <Bar dataKey="shipped" fill="#FF8042" />
                <Bar dataKey="delivered" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Second Row of Charts */}
      <div className="charts-row">
        {/* Top Products */}
        <div className="chart-card">
          <h3 className="chart-title">Top 5 Products</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={processTopProducts()}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="orders" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Pie */}
        <div className="chart-card">
          <h3 className="chart-title">Order Status Distribution</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={processPieData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {processPieData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* AI Prompts Section */}
      <div className="ai-prompts-card">
        <h3 className="chart-title">Most Common AI Image Prompts</h3>
        <div className="prompts-container">
          {processAIPrompts().map((item, index) => (
            <span
              key={index}
              className="prompt-tag"
              style={{
                backgroundColor: COLORS[index % COLORS.length],
                fontSize: `${Math.min(20, 12 + item.count / 5)}px`,
              }}
            >
              {item.prompt.length > 30 ? `${item.prompt.substring(0, 30)}...` : item.prompt} ({item.count})
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;