import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import { motion } from "framer-motion";

const incomeData = [
  { name: "Jan", income: 4000 },
  { name: "Feb", income: 3000 },
  { name: "Mar", income: 5000 },
  { name: "Apr", income: 4500 },
];

const salesData = [
  { name: "Completed", value: 70 },
  { name: "Pending", value: 30 },
];

const COLORS = ["#3C8C3E", "#D1A054"];

const Overview = () => {
  return (
    <div className="bg-farmbeige min-h-screen p-6 text-farmtext font-sans">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-md p-6 mb-8 flex flex-col md:flex-row justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold text-farmgreen">Welcome back 👋</h1>
          <p className="text-farmtext text-sm mt-2">
            Here’s what’s happening with your farm business today.
          </p>
        </div>
        <button className="mt-4 md:mt-0 bg-farmgreen text-white px-6 py-2 rounded-xl shadow hover:bg-farmbrown transition">
          View Reports
        </button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Orders", value: "1,245", change: "+12%" },
          { title: "Revenue", value: "₹84,200", change: "+8%" },
          { title: "Supplies Sold", value: "680", change: "+5%" },
          { title: "Returning Buyers", value: "320", change: "+3%" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="bg-white rounded-2xl shadow-md p-5 text-center hover:shadow-lg transition"
          >
            <h3 className="text-farmbrown font-semibold">{stat.title}</h3>
            <p className="text-2xl font-bold text-farmgreen mt-2">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500">{stat.change}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-farmbrown font-semibold mb-4">Monthly Income</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={incomeData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#3C8C3E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Orders Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-md p-6"
        >
          <h3 className="text-farmbrown font-semibold mb-4">Order Status</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={salesData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;
