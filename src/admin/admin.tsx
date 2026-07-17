import React, { useEffect, useState } from "react";

const STORAGE_KEY = "dev_portfolio_cms_v1";
const AUTH_STORAGE_KEY = "dev_portfolio_admin_auth";
const ADMIN_USERNAME = "scott";
const ADMIN_PASSWORD = "developer2024";

type Project = {
  id: string;
  title: string;
  short: string;
  details: string;
  tags: string[];
  link?: string;
};

type ProjectFormState = Omit<Partial<Project>, "tags"> & {
  tags?: string | string[];
};

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  quote: string;
};

type Person = {
  name: string;
  headline?: string;
  bio?: string;
  contact?: string;
};

const defaultData = {
  projects: [] as Project[],
  testimonials: [] as Testimonial[],
  person: { name: "", headline: "", bio: "", contact: "" } as Person,
};

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

export function AdminLoginPage({ onSuccess }: { onSuccess: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_STORAGE_KEY, "true");
      onSuccess();
      return;
    }

    setError("Invalid username or password.");
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#050505", color: "#f5f5f5" }}>
      <div style={{ width: "100%", maxWidth: 420, border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: 24, background: "rgba(255,255,255,0.04)" }}>
        <p style={{ margin: 0, textTransform: "uppercase", letterSpacing: "0.24em", color: "#67e8f9", fontSize: 12 }}>Private access</p>
        <h2 style={{ margin: "8px 0 12px", fontSize: 28 }}>Admin login</h2>
        <p style={{ margin: "0 0 20px", color: "#cbd5e1", lineHeight: 1.6 }}>Only authorized users can reach the CMS dashboard.</p>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 14 }}>
          <label style={{ display: "grid", gap: 6 }}>
            <span>Username</span>
            <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.16)", background: "#0f172a", color: "#f8fafc" }} />
          </label>

          <label style={{ display: "grid", gap: 6 }}>
            <span>Password</span>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.16)", background: "#0f172a", color: "#f8fafc" }} />
          </label>

          {error ? <div style={{ color: "#fda4af" }}>{error}</div> : null}

          <button type="submit" style={{ padding: "10px 14px", borderRadius: 8, border: "none", background: "#22d3ee", color: "#052e16", fontWeight: 700, cursor: "pointer" }}>Enter admin area</button>
        </form>
      </div>
    </div>
  );
}

export default function AdminCMS(): React.ReactElement {
  const [projects, setProjects] = useState<Project[]>(defaultData.projects);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(defaultData.testimonials);
  const [person, setPerson] = useState<Person>(defaultData.person);

  // temporary form states
  const [projForm, setProjForm] = useState<ProjectFormState>({});
  const [testForm, setTestForm] = useState<Partial<Testimonial>>({});

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setProjects(parsed.projects || []);
        setTestimonials(parsed.testimonials || []);
        setPerson(parsed.person || defaultData.person);
      } catch (e) {
        console.warn("Failed to parse cms storage", e);
      }
    }
  }, []);

  useEffect(() => {
    const payload = { projects, testimonials, person };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [projects, testimonials, person]);

  // Projects CRUD
  function saveProject() {
    if (!projForm.title) return;
    if (projForm.id) {
      setProjects((p) => p.map((x) => (x.id === projForm.id ? { ...(x as Project), ...(projForm as Project) } : x)));
    } else {
      const newP: Project = {
        id: uid("proj"),
        title: projForm.title || "Untitled",
        short: projForm.short || "",
        details: projForm.details || "",
        tags: projForm.tags ? (projForm.tags as any).split?.(",")?.map((s: string) => s.trim()) || [] : [],
        link: projForm.link,
      };
      setProjects((p) => [newP, ...p]);
    }
    setProjForm({});
  }

  function editProject(id: string) {
    const p = projects.find((x) => x.id === id);
    if (p) setProjForm({ ...p, tags: p.tags.join(", ") });
  }

  function deleteProject(id: string) {
    if (!confirm("Delete project?")) return;
    setProjects((p) => p.filter((x) => x.id !== id));
  }

  // Testimonials CRUD
  function saveTestimonial() {
    if (!testForm.name || !testForm.quote) return;
    if (testForm.id) {
      setTestimonials((t) => t.map((x) => (x.id === testForm.id ? { ...(x as Testimonial), ...(testForm as Testimonial) } : x)));
    } else {
      const newT: Testimonial = {
        id: uid("test"),
        name: testForm.name as string,
        role: testForm.role,
        quote: testForm.quote as string,
      };
      setTestimonials((t) => [newT, ...t]);
    }
    setTestForm({});
  }

  function editTestimonial(id: string) {
    const t = testimonials.find((x) => x.id === id);
    if (t) setTestForm(t);
  }

  function deleteTestimonial(id: string) {
    if (!confirm("Delete testimonial?")) return;
    setTestimonials((t) => t.filter((x) => x.id !== id));
  }

  // Person update
  function updatePersonField<K extends keyof Person>(k: K, v: Person[K]) {
    setPerson((p) => ({ ...p, [k]: v }));
  }

  return (
    <div style={{ fontFamily: "sans-serif", padding: 20, maxWidth: 900, margin: "0 auto" }}>
      <h2>CMS Admin</h2>

      <section>
        <h3>Landing / About — Personal Info</h3>
        <label>Name<br />
          <input value={person.name} onChange={(e) => updatePersonField("name", e.target.value)} />
        </label>
        <br />
        <label>Headline<br />
          <input value={person.headline} onChange={(e) => updatePersonField("headline", e.target.value)} />
        </label>
        <br />
        <label>Contact (email or url)<br />
          <input value={person.contact} onChange={(e) => updatePersonField("contact", e.target.value)} />
        </label>
        <br />
        <label>Bio<br />
          <textarea rows={4} value={person.bio} onChange={(e) => updatePersonField("bio", e.target.value)} />
        </label>
      </section>

      <hr />

      <section>
        <h3>Projects</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label>Title<br />
              <input value={projForm.title || ""} onChange={(e) => setProjForm({ ...projForm, title: e.target.value })} />
            </label>
            <br />
            <label>Short summary<br />
              <input value={projForm.short || ""} onChange={(e) => setProjForm({ ...projForm, short: e.target.value })} />
            </label>
            <br />
            <label>Details (full breakdown)<br />
              <textarea rows={6} value={projForm.details || ""} onChange={(e) => setProjForm({ ...projForm, details: e.target.value })} />
            </label>
            <br />
            <label>Tags (comma separated)<br />
              <input value={(projForm.tags as any) || ""} onChange={(e) => setProjForm({ ...projForm, tags: e.target.value })} />
            </label>
            <br />
            <label>Link<br />
              <input value={projForm.link || ""} onChange={(e) => setProjForm({ ...projForm, link: e.target.value })} />
            </label>
            <br />
            <div style={{ marginTop: 8 }}>
              <button onClick={saveProject}>{projForm.id ? "Update Project" : "Add Project"}</button>
              <button onClick={() => setProjForm({})} style={{ marginLeft: 8 }}>Clear</button>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h4>Existing Projects</h4>
            {projects.length === 0 && <div>No projects yet</div>}
            <ul>
              {projects.map((p) => (
                <li key={p.id} style={{ marginBottom: 8 }}>
                  <strong>{p.title}</strong> — {p.short}
                  <div>
                    <button onClick={() => editProject(p.id)}>Edit</button>
                    <button onClick={() => deleteProject(p.id)} style={{ marginLeft: 8 }}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <hr />

      <section>
        <h3>Testimonials</h3>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <label>Name<br />
              <input value={testForm.name || ""} onChange={(e) => setTestForm({ ...testForm, name: e.target.value })} />
            </label>
            <br />
            <label>Role<br />
              <input value={testForm.role || ""} onChange={(e) => setTestForm({ ...testForm, role: e.target.value })} />
            </label>
            <br />
            <label>Quote<br />
              <textarea rows={4} value={testForm.quote || ""} onChange={(e) => setTestForm({ ...testForm, quote: e.target.value })} />
            </label>
            <br />
            <div style={{ marginTop: 8 }}>
              <button onClick={saveTestimonial}>{testForm.id ? "Update" : "Add"}</button>
              <button onClick={() => setTestForm({})} style={{ marginLeft: 8 }}>Clear</button>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <h4>Existing Testimonials</h4>
            {testimonials.length === 0 && <div>No testimonials yet</div>}
            <ul>
              {testimonials.map((t) => (
                <li key={t.id} style={{ marginBottom: 8 }}>
                  <strong>{t.name}</strong> — {t.role}
                  <div>“{t.quote}”</div>
                  <div>
                    <button onClick={() => editTestimonial(t.id)}>Edit</button>
                    <button onClick={() => deleteTestimonial(t.id)} style={{ marginLeft: 8 }}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <hr />

      <section>
        <h3>Export / Import</h3>
        <button
          onClick={() => {
            const data = { projects, testimonials, person };
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "cms-export.json";
            a.click();
            URL.revokeObjectURL(url);
          }}
        >
          Export JSON
        </button>
        <input
          style={{ marginLeft: 8 }}
          type="file"
          accept="application/json"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const parsed = JSON.parse(String(reader.result));
                setProjects(parsed.projects || []);
                setTestimonials(parsed.testimonials || []);
                setPerson(parsed.person || defaultData.person);
              } catch (err) {
                alert("Invalid file");
              }
            };
            reader.readAsText(f);
          }}
        />
      </section>
    </div>
  );
}
