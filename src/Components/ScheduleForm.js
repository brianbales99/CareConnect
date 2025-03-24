// components/ScheduleForm.js
export function ScheduleForm({ onSubmit }) {
    return (
      <form className="space-y-4" onSubmit={onSubmit}>
        <input type="text" placeholder="Patient Name" className="w-full p-2 border rounded" />
        <input type="date" className="w-full p-2 border rounded" />
        <input type="time" className="w-full p-2 border rounded" />

      </form>
    );
  }