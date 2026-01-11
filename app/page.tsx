import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Product Designer
      </h1>
      <p className="mb-4">
        {`As UX Designer, I design software that unifies automated workflows, real-time data, and human input, delivering mission-critical situational awareness for effective decision-making in time-sensitive environments. Sometimes, I build tools that eliminate operational friction, redirecting effort toward strategic problem-solving and value creation`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  )
}
