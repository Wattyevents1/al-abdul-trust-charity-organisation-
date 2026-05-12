<template>
  <div class="container">
    <header class="header">
      <h1>Al-Abdul Trust</h1>
      <p class="tagline">Charity Organisation</p>
    </header>

    <main class="main">
      <section class="hero">
        <h2>Welcome to Our Organisation</h2>
        <p>Making a positive difference in the community through compassion and dedication.</p>
        <button class="btn" @click="isExpanded = !isExpanded">
          {{ isExpanded ? 'Learn Less' : 'Learn More' }}
        </button>
      </section>

      <section v-if="isExpanded" class="info-section">
        <h3>Our Mission</h3>
        <p>We are committed to providing support and assistance to those in need, promoting education, healthcare, and social welfare in our community.</p>
      </section>

      <section class="services">
        <h3>Our Services</h3>
        <div class="services-grid">
          <div class="service-card">
            <div class="icon">❤️</div>
            <h4>Community Care</h4>
            <p>Supporting families and individuals in need</p>
          </div>
          <div class="service-card">
            <div class="icon">📚</div>
            <h4>Education</h4>
            <p>Providing educational opportunities and resources</p>
          </div>
          <div class="service-card">
            <div class="icon">🏥</div>
            <h4>Healthcare</h4>
            <p>Ensuring access to essential health services</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2026 Al-Abdul Trust Charity Organisation. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isExpanded: false
    }
  }
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #333;
}

.header {
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.header h1 {
  font-size: 2.5rem;
  color: #667eea;
  margin-bottom: 0.5rem;
}

.tagline {
  font-size: 1.1rem;
  color: #666;
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

.hero {
  background: white;
  padding: 3rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.hero h2 {
  font-size: 2rem;
  color: #667eea;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
}

.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.info-section {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

.info-section h3 {
  color: #667eea;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.info-section p {
  color: #666;
  line-height: 1.8;
}

.services {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.services h3 {
  color: #667eea;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  text-align: center;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.service-card {
  padding: 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.service-card h4 {
  color: #667eea;
  margin-bottom: 0.5rem;
}

.service-card p {
  color: #666;
  font-size: 0.95rem;
}

.footer {
  background: rgba(0, 0, 0, 0.2);
  color: white;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .hero h2 {
    font-size: 1.5rem;
  }
  
  .hero {
    padding: 1.5rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>
