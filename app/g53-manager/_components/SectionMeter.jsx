const SectionMeter = ({ items = [] }) => {
  const maxValue = Math.max(...items.map((item) => item.value), 1);

  return (
    <section className="overflow-hidden rounded-4xl border border-dark15 bg-white">
      <div className="grid lg:grid-cols-[220px_1fr]">
        <div className="bg-dark p-6 text-white">
          <p className="text-3xl font-medium leading-tight">
            Статистика раздела
          </p>
        </div>

        <div className="grid divide-y divide-dark15 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {items.map((item) => {
            const width = `${Math.max((item.value / maxValue) * 100, 8)}%`;

            return (
              <div key={item.label} className="p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-sm text-dark50">
                      {item.label}
                    </p>
                    <p className="mt-2 text-4xl font-medium text-dark">
                      {item.value}
                    </p>
                  </div>
                  <p className="pb-1 text-sm text-dark50">
                    {item.caption}
                  </p>
                </div>

                <div className="mt-5 h-1.5 rounded-full bg-dark10">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionMeter;
