import requests
import sys
import json
from datetime import datetime

class CosmicPortfolioAPITester:
    def __init__(self, base_url="https://cosmic-data-eng.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_result(self, name, success, response_data=None, error=None):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test": name,
            "success": success,
            "timestamp": datetime.now().isoformat(),
            "response_data": response_data,
            "error": str(error) if error else None
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} - {name}")
        if error and not success:
            print(f"    Error: {error}")

    def run_test(self, name, method, endpoint, expected_status, data=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, params=params, timeout=30)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=30)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=30)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=30)

            success = response.status_code == expected_status
            response_data = None
            
            try:
                response_data = response.json()
            except:
                response_data = response.text

            if not success:
                error = f"Expected {expected_status}, got {response.status_code}. Response: {response_data}"
                self.log_result(name, False, response_data, error)
                return False, {}
            else:
                self.log_result(name, True, response_data)
                return True, response_data

        except Exception as e:
            self.log_result(name, False, None, str(e))
            return False, {}

    def test_root_endpoint(self):
        """Test root API endpoint"""
        success, response = self.run_test("Root API", "GET", "", 200)
        return success

    def test_seed_database(self):
        """Test database seeding"""
        success, response = self.run_test("Seed Database", "POST", "seed", 200)
        return success

    def test_blog_endpoints(self):
        """Test blog-related endpoints"""
        print("\n🔍 Testing Blog Endpoints...")
        
        # Get all blog posts
        success, posts = self.run_test("Get Blog Posts", "GET", "blog", 200)
        if not success:
            return False

        # Test blog post filtering
        self.run_test("Get Blog Posts by Category", "GET", "blog", 200, 
                     params={"category": "Data Engineering"})
        
        self.run_test("Search Blog Posts", "GET", "blog", 200, 
                     params={"search": "data"})

        # Test individual post retrieval
        if posts and len(posts) > 0:
            first_post = posts[0]
            self.run_test(f"Get Blog Post by Slug", "GET", f"blog/{first_post['slug']}", 200)
            
            # Test creating a new blog post
            new_post_data = {
                "title": "Test Blog Post",
                "slug": "test-blog-post", 
                "content": "# Test Content\n\nThis is a test blog post.",
                "excerpt": "A test blog post for testing purposes.",
                "category": "Tech",
                "tags": ["test", "api"],
                "read_time": 3,
                "published": True
            }
            
            create_success, created_post = self.run_test("Create Blog Post", "POST", "blog", 200, data=new_post_data)
            
            if create_success and created_post:
                post_id = created_post.get('id')
                # Test updating the post
                updated_data = {**new_post_data, "title": "Updated Test Blog Post"}
                self.run_test("Update Blog Post", "PUT", f"blog/{post_id}", 200, data=updated_data)
                
                # Test deleting the post
                self.run_test("Delete Blog Post", "DELETE", f"blog/{post_id}", 200)

        return True

    def test_projects_endpoints(self):
        """Test project-related endpoints"""
        print("\n🔍 Testing Projects Endpoints...")
        
        # Get all projects
        success, projects = self.run_test("Get Projects", "GET", "projects", 200)
        if not success:
            return False

        # Test project filtering
        self.run_test("Get Projects by Category", "GET", "projects", 200, 
                     params={"category": "AI/ML"})

        # Test individual project retrieval
        if projects and len(projects) > 0:
            first_project = projects[0]
            self.run_test("Get Project by ID", "GET", f"projects/{first_project['id']}", 200)
            
            # Test creating a new project
            new_project_data = {
                "title": "Test Project",
                "description": "A test project for API testing",
                "full_description": "Full description of the test project",
                "category": "Full Stack",
                "tech_stack": ["Python", "FastAPI", "React"],
                "github_url": "https://github.com/test",
                "live_url": "https://test.example.com",
                "featured": False
            }
            
            create_success, created_project = self.run_test("Create Project", "POST", "projects", 200, data=new_project_data)
            
            if create_success and created_project:
                project_id = created_project.get('id')
                # Test updating the project
                updated_data = {**new_project_data, "title": "Updated Test Project"}
                self.run_test("Update Project", "PUT", f"projects/{project_id}", 200, data=updated_data)
                
                # Test deleting the project
                self.run_test("Delete Project", "DELETE", f"projects/{project_id}", 200)

        return True

    def test_tech_news_endpoints(self):
        """Test tech news endpoints"""
        print("\n🔍 Testing Tech News Endpoints...")
        
        # Get all tech news
        success, news = self.run_test("Get Tech News", "GET", "tech-news", 200)
        if not success:
            return False

        # Test news filtering
        self.run_test("Get Tech News by Category", "GET", "tech-news", 200, 
                     params={"category": "AI"})

        # Test creating new tech news
        new_news_data = {
            "headline": "Test Tech News Headline",
            "source": "Test Source",
            "source_url": "https://test.example.com",
            "summary": "This is a test tech news summary for API testing.",
            "category": "AI"
        }
        
        create_success, created_news = self.run_test("Create Tech News", "POST", "tech-news", 200, data=new_news_data)
        
        if create_success and created_news:
            news_id = created_news.get('id')
            # Test updating the news
            updated_data = {**new_news_data, "headline": "Updated Test Tech News"}
            self.run_test("Update Tech News", "PUT", f"tech-news/{news_id}", 200, data=updated_data)
            
            # Test deleting the news
            self.run_test("Delete Tech News", "DELETE", f"tech-news/{news_id}", 200)

        return True

    def test_comments_endpoints(self):
        """Test comments endpoints"""
        print("\n🔍 Testing Comments Endpoints...")
        
        # Get all comments (should be empty or have seeded comments)
        success, all_comments = self.run_test("Get All Comments", "GET", "comments", 200)
        if not success:
            return False

        # Test getting pending comments
        self.run_test("Get Pending Comments", "GET", "comments", 200, 
                     params={"pending_only": True})

        # Get blog posts to test comment creation
        blog_success, posts = self.run_test("Get Blog Posts for Comments", "GET", "blog", 200)
        
        if blog_success and posts and len(posts) > 0:
            first_post = posts[0]
            post_id = first_post['id']
            
            # Test getting comments for a specific post
            self.run_test(f"Get Comments for Post", "GET", f"comments/{post_id}", 200)
            
            # Test creating a comment
            comment_data = {
                "post_id": post_id,
                "name": "Test Commenter",
                "email": "test@example.com",
                "content": "This is a test comment for API testing."
            }
            
            create_success, created_comment = self.run_test("Create Comment", "POST", "comments", 200, data=comment_data)
            
            if create_success and created_comment:
                comment_id = created_comment.get('id')
                
                # Test approving the comment
                self.run_test("Approve Comment", "PUT", f"comments/{comment_id}/approve", 200)
                
                # Test deleting the comment
                self.run_test("Delete Comment", "DELETE", f"comments/{comment_id}", 200)
            
            # Test comment count endpoint
            self.run_test("Get Comment Count", "GET", f"comments/count/{post_id}", 200)

        return True

    def test_contact_endpoints(self):
        """Test contact endpoints"""
        print("\n🔍 Testing Contact Endpoints...")
        
        # Test creating a contact message
        contact_data = {
            "name": "Test User",
            "email": "testuser@example.com",
            "subject": "Test Subject",
            "message": "This is a test contact message for API testing."
        }
        
        create_success, created_message = self.run_test("Create Contact Message", "POST", "contact", 200, data=contact_data)
        
        if create_success and created_message:
            message_id = created_message.get('id')
            
            # Test getting all contact messages
            self.run_test("Get Contact Messages", "GET", "contact", 200)
            
            # Test marking message as read
            self.run_test("Mark Message as Read", "PUT", f"contact/{message_id}/read", 200)
            
            # Test deleting the message
            self.run_test("Delete Contact Message", "DELETE", f"contact/{message_id}", 200)

        return True

    def test_analytics_endpoints(self):
        """Test analytics endpoints"""
        print("\n🔍 Testing Analytics Endpoints...")
        
        # Test recording a page view - using query parameters
        self.run_test("Record Page View", "POST", "analytics/view?page_type=blog&page_id=test-page", 200)
        
        # Test getting analytics summary
        self.run_test("Get Analytics Summary", "GET", "analytics/summary", 200)
        
        return True

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Cosmic Portfolio API Tests")
        print(f"Testing against: {self.base_url}\n")

        # Test basic connectivity
        if not self.test_root_endpoint():
            print("❌ Cannot connect to API. Stopping tests.")
            return False

        # Seed database first
        self.test_seed_database()

        # Run all endpoint tests
        self.test_blog_endpoints()
        self.test_projects_endpoints() 
        self.test_tech_news_endpoints()
        self.test_comments_endpoints()
        self.test_contact_endpoints()
        self.test_analytics_endpoints()

        # Print final results
        print(f"\n📊 Test Results:")
        print(f"Total tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success rate: {(self.tests_passed / self.tests_run * 100):.1f}%")

        return self.tests_passed == self.tests_run

def main():
    tester = CosmicPortfolioAPITester()
    success = tester.run_all_tests()
    
    # Save detailed results
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(tester.test_results, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())