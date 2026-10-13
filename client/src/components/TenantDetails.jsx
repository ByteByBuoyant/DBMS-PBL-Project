import axios from "axios";
import React, { useEffect, useState } from "react";

function TenantDetails(props) {
  const header = ["Tenant no", "Room_no", "Name", "Age", "DOB", "Stat"];

  const [tenantRows, setTenantRows] = useState([]);

  const getTenantRows = async () => {
    try {
      const res = await axios.get("http://localhost:5001/tenantDetails");
      setTenantRows(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTenantRows();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead>
                  <tr className="bg-blue-500 text-center">
                    {header.map((ele, index) => {
                      return (
                        <th
                          key={index + 1}
                          className="
                              w-1/6
                              min-w-[160px]
                              text-lg
                              font-semibold
                              text-white
                              py-4
                              lg:py-7       
                              px-3
                              lg:px-4
                              border-l border-transparent
                              "
                        >
                          {ele}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* <tr> */}
                  {tenantRows.map((ele, index) => {
                    return (
                      <tr key={index + 1}>
                        <td
                          className="
                              text-center text-dark
                              font-medium
                              text-base
                              py-5
                              px-2
                              bg-[#F3F6FF]
                              border-b border-l border-[#E8E8E8]
                              "
                        >
                          {ele.tenant_id}
                        </td>
                        <td
                          className="
                              text-center text-dark
                              font-medium
                              text-base
                              py-5
                              px-2
                              bg-[#F3F6FF]
                              border-b border-l border-[#E8E8E8]
                              "
                        >
                          {ele.room_no}
                        </td>
                        <td
                          className="
                              text-center text-dark
                              font-medium
                              text-base
                              py-5
                              px-2
                              bg-[#F3F6FF]
                              border-b border-l border-[#E8E8E8]
                              "
                        >
                          {ele.name}
                        </td>
                        <td
                          className="
                              text-center text-dark
                              font-medium
                              text-base
                              py-5
                              px-2
                              bg-[#F3F6FF]
                              border-b border-l border-[#E8E8E8]
                              "
                        >
                          {ele.age}
                        </td>
                        <td
                          className="
                              text-center text-dark
                              font-medium
                              text-base
                              py-5
                              px-2
                              bg-[#F3F6FF]
                              border-b border-l border-[#E8E8E8]
                              "
                        >
                          {ele.dob}
                        </td>
                        <td
                          className="
                              text-center text-dark
                              font-medium
                              text-base
                              py-5
                              px-2
                              bg-[#F3F6FF]
                              border-b border-l border-[#E8E8E8]
                              "
                        >
                          {(() => {
                            const val = String(ele.stat).toLowerCase().trim();
                            const isPaid = val === "paid" || val === "yes" || val === "y" || val === "1";
                            if (isPaid) {
                              return (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                  </svg>
                                  Paid
                                </span>
                              );
                            } else {
                              return (
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-700 border border-amber-500/20">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                                    <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                  </svg>
                                  Not Paid
                                </span>
                              );
                            }
                          })()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TenantDetails;
