import "../styles/StatsBar.css";

function StatsBar({ stats = [] }) {
  return (
    <div className="stats-bar" role="list">
      {stats.map((stat) => (
        <div key={`${stat.value}-${stat.label}`} className="stats-bar__item" role="listitem">
          <span className="stats-bar__value">{stat.value}</span>
          <span className="stats-bar__label">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}

export default StatsBar;
