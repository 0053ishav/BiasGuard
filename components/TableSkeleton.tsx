type TableSkeletonProps = {
  rows?: number; // optional, default to 5
};

export default function TableSkeleton({ rows = 5 }: TableSkeletonProps) {
  return (
    <section className="mb-12">
      <div className="h-8 w-48 bg-gray-300 rounded mb-4 animate-pulse" />
      <div className="rounded-lg border">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2">
                <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
              </th>
              <th className="text-left p-2">
                <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
              </th>
              <th className="text-right p-2">
                <div className="h-4 w-12 bg-gray-300 rounded animate-pulse" />
              </th>
              <th className="text-right p-2">
                <div className="h-4 w-12 bg-gray-300 rounded animate-pulse" />
              </th>
              <th className="text-right p-2">
                <div className="h-4 w-14 bg-gray-300 rounded animate-pulse" />
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(rows)].map((_, i) => (
              <tr key={i} className="border-t border-gray-200">
                <td className="p-2">
                  <div className="h-5 w-40 bg-gray-300 rounded animate-pulse" />
                </td>
                <td className="p-2">
                  <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
                </td>
                <td className="p-2 text-right">
                  <div className="h-4 w-14 bg-gray-300 rounded animate-pulse ml-auto" />
                </td>
                <td className="p-2 text-right">
                  <div className="h-4 w-14 bg-gray-300 rounded animate-pulse ml-auto" />
                </td>
                <td className="p-2 text-right">
                  <div className="h-4 w-16 bg-gray-300 rounded animate-pulse ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
