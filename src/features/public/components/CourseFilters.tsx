import { Search, SlidersHorizontal } from "lucide-react";

export function CourseFilters() {
  return (
    <section className="course-filters" aria-label="Filter kursus">
      <label className="search-field">
        <Search size={18} />
        <input placeholder="Cari kursus, kategori, atau instruktur" />
      </label>
      <div className="filter-chips">
        <button className="chip chip--active">Semua</button>
        <button className="chip">Programming</button>
        <button className="chip">Design</button>
        <button className="chip">Data</button>
      </div>
      <button className="button button--secondary">
        <SlidersHorizontal size={17} />
        Filter
      </button>
    </section>
  );
}
