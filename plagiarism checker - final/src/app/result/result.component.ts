import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,AfterViewInit, OnDestroy  } from '@angular/core';
import { Route,Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckplagiarismComponent } from '../checkplagiarism/checkplagiarism.component';
import { Chart } from 'chart.js/auto';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-result',
  imports: [HttpClientModule,CommonModule,RouterModule,SidebarComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  plagiarismResults: { comparison: string; similarity: number }[] = [];
  documentName: string = '';
  plagiarismMessage: string = '';
  plagiarizedDoc: string = '';
  plagiarismPercentage: number = 0;
  chart: any;
  chartInstance: Chart | null = null; // Store chart instance
  showChart: boolean = false;


  constructor(private router: Router) {
    // Retrieve data from navigation state
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.plagiarismResults = navigation.extras.state['plagiarismResults'] || [];
      this.documentName = navigation.extras.state['documentName'] || '';
    this.checkPlagiarismWarning();
    }
  }
  checkPlagiarismWarning() {
    const highSimilarity = this.plagiarismResults.find(result => result.similarity > 75);
    if (highSimilarity) {
      this.plagiarizedDoc = highSimilarity.comparison; 
      this.plagiarismMessage = `⚠ Warning: High similarity detected with "${this.plagiarizedDoc}". Please check the source.`;
    } else {
      this.plagiarismMessage = ''; // Clear message if no high similarity
    }
  }
  

  ngAfterViewInit() {
    this.calculatePlagiarismPercentage();
    this.createPlagiarismChart();
  }
  ngOnDestroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

  generateColors(count: number): string[] {
    const colors = [
      '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#C9CBCF',
      '#FF5733', '#33FF57', '#5733FF', '#FFD700', '#800000', '#00CED1', '#008080'
    ];
    return Array.from({ length: count }, (_, i) => colors[i % colors.length]);
  }


  calculatePlagiarismPercentage() {
    if (this.plagiarismResults.length > 0) {
      let totalSimilarity = this.plagiarismResults.reduce((sum, result) => sum + result.similarity, 0);
      this.plagiarismPercentage = totalSimilarity / this.plagiarismResults.length;
    } else {
      this.plagiarismPercentage = 0;
    }
  }
  createPlagiarismChart() {
    const labels = this.plagiarismResults.map(result => result.comparison);
    const dataValues = this.plagiarismResults.map(result => result.similarity);

    if (this.chart) {
      this.chart.destroy(); // Destroy old chart if it exists
    }

    this.chart = new Chart("plagiarismChart", {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: dataValues,
          backgroundColor: dataValues.map(value => value > 75 ? '#FF6384' : '#36A2EB') // Red for high similarity
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        }
      }
    });
  }

  
  createOrUpdatePlagiarismChart() {
    const ctx = document.getElementById('plagiarismChart') as HTMLCanvasElement;

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const labels = this.plagiarismResults.map(result => result.comparison);
    const data = this.plagiarismResults.map(result => result.similarity);
    const backgroundColors = this.generateColors(this.plagiarismResults.length);

    this.chartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels.length > 0 ? labels : ['No Plagiarism Detected'],
        datasets: [{
          data: data.length > 0 ? data : [100],
          backgroundColor: data.length > 0 ? backgroundColors : ['#2ecc71'],
        }]
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#333',
              font: { size: 14 }
            }
          }
        }
      }
    });
  }
  showPlagiarismChart() {
    this.showChart = true; // Show the popup
    this.createOrUpdatePlagiarismChart();
  }
  
  closeChart() {
    this.showChart = false; // Hide the popup
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}
