import { describe, it, expect } from 'vitest'
import { chunkArticles } from './chunkArticles'

describe('chunkArticles', () => {
  describe('no h2 elements', () => {
    it('returns all text as a single chunk when there are no h2 elements', () => {
      const html = `
                <p>This is the intro paragraph.</p>
                <p>Another paragraph with some text.</p>
              
      `
      const result = chunkArticles(html)
      expect(result).toHaveLength(1)
      expect(result[0]).toContain('This is the intro paragraph.')
      expect(result[0]).toContain('Another paragraph with some text.')
    })

    it('returns empty array when main has no text content', () => {
      const html = `
                <div></div>
                <img src="test.jpg" />
              
      `
      const result = chunkArticles(html)
      expect(result).toEqual([])
    })

    it('returns empty array when main is empty', () => {
      const html = `
            </article>
          </body>
        </html>
      `
      const result = chunkArticles(html)
      expect(result).toEqual([])
    })
  })

  describe('text before first h2', () => {
    it('includes text before the first h2 as its own chunk', () => {
      const html = `
                <p>Introduction text that appears before any heading.</p>
                <h2>First Heading</h2>
                <p>Content after first heading.</p>
              
      `
      const result = chunkArticles(html)
      expect(result).toHaveLength(2)
      expect(result[0]).toContain(
        'Introduction text that appears before any heading.'
      )
      expect(result[1]).toContain('First Heading')
      expect(result[1]).toContain('Content after first heading.')
    })

    it('handles empty text before first h2', () => {
      const html = `
                <h2>First Heading</h2>
                <p>Content after first heading.</p>
              
      `
      const result = chunkArticles(html)
      expect(result).toHaveLength(1)
      expect(result[0]).toContain('First Heading')
    })
  })

  describe('single h2 element', () => {
    it('returns the h2 heading with its content', () => {
      const html = `
                <h2>My Section</h2>
                <p>Some content in this section.</p>
              
      `
      const result = chunkArticles(html)
      expect(result).toHaveLength(1)
      expect(result[0]).toContain('My Section')
      expect(result[0]).toContain('Some content in this section.')
    })
  })

  describe('multiple h2 elements', () => {
    it('splits content by each h2 heading', () => {
      const html = `
                <h2>Section One</h2>
                <p>Content for section one.</p>
                <h2>Section Two</h2>
                <p>Content for section two.</p>
                <h2>Section Three</h2>
                <p>Content for section three.</p>
              
      `
      const result = chunkArticles(html)
      expect(result).toHaveLength(3)
      expect(result[0]).toContain('Section One')
      expect(result[0]).toContain('Content for section one.')
      expect(result[1]).toContain('Section Two')
      expect(result[1]).toContain('Content for section two.')
      expect(result[2]).toContain('Section Three')
      expect(result[2]).toContain('Content for section three.')
    })

    it('handles h2 elements with no content between them', () => {
      const html = `
                <h2>Section One</h2>
                <p>Content for section one.</p>
                <h2>Section Two</h2>
                <h2>Section Three</h2>
                <p>Content for section three.</p>
              
      `
      const result = chunkArticles(html)
      expect(result).toHaveLength(3)
      expect(result[1]).toBe('Section Two')
    })

    it('handles h2 elements with no content after the last one', () => {
      const html = `
                <h2>Section One</h2>
                <p>Content for section one.</p>
                <h2>Section Two</h2>
              
      `
      const result = chunkArticles(html)
      expect(result).toHaveLength(2)
      expect(result[1]).toBe('Section Two')
    })

    it('includes multiple paragraphs within a section', () => {
      const html = `
                <h2>Section One</h2>
                <p>First paragraph.</p>
                <p>Second paragraph.</p>
                <div>
                  <p>Nested paragraph.</p>
                </div>
                <h2>Section Two</h2>
                <p>Content for section two.</p>
              
      `
      const result = chunkArticles(html)
      expect(result).toHaveLength(2)
      expect(result[0]).toContain('First paragraph.')
      expect(result[0]).toContain('Second paragraph.')
      expect(result[0]).toContain('Nested paragraph.')
      expect(result[1]).toContain('Content for section two.')
    })
  })

  describe('heading text cleanup', () => {
    it('trims heading text', () => {
      const html = `
                <h2>   Trimmed Heading   </h2>
                <p>Content.</p>
              
      `
      const result = chunkArticles(html)
      // Heading text should be trimmed (no leading/trailing whitespace)
      expect(result[0]).toMatch(/^Trimmed Heading\n\nContent\.$/)
    })
  })

  describe('whitespace normalization', () => {
    it('reduces excessive newlines to double newlines', () => {
      const html = `
                <h2>Section</h2>
                <p>Para 1</p>
                <p>Para 2</p>
                <p>Para 3</p>
                <h2>Section Two</h2>
                <p>Content.</p>
              
      `
      const result = chunkArticles(html)
      // Should not contain triple or more consecutive newlines
      for (const chunk of result) {
        expect(chunk).not.toMatch(/\n{3,}/)
      }
    })

    it('trims each chunk', () => {
      const html = `
                <h2>Section</h2>
                <p>Content.</p>
              
      `
      const result = chunkArticles(html)
      expect(result[0]).toBe(result[0].trim())
    })
  })

  describe('edge cases', () => {
    it('handles deeply nested content within h2 sections', () => {
      const html = `
                <h2>Complex Section</h2>
                <div>
                  <section>
                    <article>
                      <p>Deeply nested content.</p>
                    </article>
                  </section>
                </div>
                <h2>Next Section</h2>
                <p>Next content.</p>
              
      `
      const result = chunkArticles(html)
      expect(result).toHaveLength(2)
      expect(result[0]).toContain('Deeply nested content.')
      expect(result[1]).toContain('Next content.')
    })

    it('handles h2 with inline elements', () => {
      const html = `
                <h2><strong>Bold</strong> and <em>italic</em> heading</h2>
                <p>Content.</p>
              
      `
      const result = chunkArticles(html)
      expect(result[0]).toContain('Bold and italic heading')
    })
  })

  describe('real world', () => {
    it('works on a real blog article', () => {
      const html = `<p>The RabbitMQTest repository is a C# project that demonstrates how to use RabbitMQ for message queuing. It brings the producer–consumer pattern to life, showing how a producer streams messages and a consumer processes them asynchronously — perfect for developers exploring event-driven communication.</p>
<h2>From Basics to Brilliance</h2>
<p>Brings the producer–consumer pattern to life
Kickstart your RabbitMQ journey with plug‑and‑play setup
Shows how queues and exchanges power microservices and event-driven systems
</p>
<h2>🧩 Under the Hood</h2>
<p>RabbitMQSetup: Declares queues/exchanges and primes RabbitMQ for messaging
Producer: Publishes messages into the queue
Consumer: Subscribes and processes messages asynchronously
Connection settings: Link the C# app with RabbitMQ locally or via Docker/Kubernetes
This flow illustrates how RabbitMQ decouples services — producers and consumers don’t need to run simultaneously, yet messages are reliably delivered, enabling scalable cloud-native deployments.</p>
<hr />
<h2> Dockerized in Minutes</h2>
<p>Use the RabbitMQ image with the management plugin to run the broker locally or in containers. This provides both the service and a web-based management UI.
Port 5672 → for applications to connect
Port 15672 → for the RabbitMQ Management UI (http://localhost:15672)
Default credentials: guest / guest </p>`

      const result = chunkArticles(html)
      expect(result[0]).toContain(
        'The RabbitMQTest repository is a C# project that demonstrates how to use RabbitMQ for message queuing. It brings the producer–consumer pattern to life, showing how a producer streams messages and a consumer processes them asynchronously — perfect for developers exploring event-driven communication.'
      )
      expect(result[1]).toContain('From Basics to Brilliance')
      expect(result[1]).toContain('Kickstart your RabbitMQ journey')
    })
  })
})
